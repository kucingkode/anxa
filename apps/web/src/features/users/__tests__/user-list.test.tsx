import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserList } from "../components/user-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      email: "a@simk.dev",
      role: {
        id: "role-admin",
        name: "Admin",
        permissions: ["users:write", "users:delete"],
        isSystem: true,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
      },
    },
    isAuthenticated: true,
  }),
}));

vi.mock("@/features/roles/hooks/use-roles", () => ({
  useRoles: vi.fn(),
}));

vi.mock("../hooks/use-users", () => ({
  useUsers: vi.fn(),
  useUser: vi.fn(),
  useCreateUser: vi.fn(),
  useUpdateUser: vi.fn(),
  useDeleteUser: vi.fn(),
}));

import { useCreateUser, useDeleteUser, useUpdateUser, useUsers } from "../hooks/use-users";
import { useRoles } from "@/features/roles/hooks/use-roles";

const roles = [
  {
    id: "role-admin",
    name: "Admin",
    permissions: ["users:write", "users:delete"],
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "role-doctor",
    name: "Dokter",
    permissions: [],
    isSystem: false,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

const users = [
  {
    id: "1",
    name: "Admin Utama",
    email: "admin@simk.dev",
    roleId: "role-admin",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Dr. Budi",
    email: "budi@simk.dev",
    roleId: "role-doctor",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("UserList", () => {
  beforeEach(() => {
    vi.mocked(useRoles).mockReturnValue({
      data: roles,
      isLoading: false,
    } as never);
    vi.mocked(useUsers).mockReturnValue({
      data: users,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteUser).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateUser).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateUser).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders user rows", () => {
    render(<UserList />);
    expect(screen.getByText("Admin Utama")).toBeInTheDocument();
    expect(screen.getByText("admin@simk.dev")).toBeInTheDocument();
    expect(screen.getByText("Dr. Budi")).toBeInTheDocument();
  });

  it("renders role names from useRoles", () => {
    render(<UserList />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Dokter")).toBeInTheDocument();
  });

  it("shows add button for admin", () => {
    render(<UserList />);
    expect(screen.getByRole("button", { name: /Tambah Pengguna/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<UserList />);
    expect(screen.queryByText("Admin Utama")).not.toBeInTheDocument();
  });

  it("shows empty state when no users", () => {
    vi.mocked(useUsers).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<UserList />);
    expect(screen.getByText("Tidak ada pengguna.")).toBeInTheDocument();
  });
});
