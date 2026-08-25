import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { RoleList } from "../components/role-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      email: "a@simk.dev",
      role: { name: "admin", permissions: ["roles:read", "roles:write", "roles:delete"], isSystem: false },
    },
    isAuthenticated: true,
  }),
}));

vi.mock("../hooks/use-roles", () => ({
  useRoles: vi.fn(),
  useRole: vi.fn(),
  useCreateRole: vi.fn(),
  useUpdateRole: vi.fn(),
  useDeleteRole: vi.fn(),
}));

import {
  useRoles,
  useCreateRole,
  useDeleteRole,
  useUpdateRole,
} from "../hooks/use-roles";

const roles = [
  {
    id: "1",
    name: "admin",
    description: "Akses penuh",
    permissions: ["patients:read", "patients:write", "roles:read", "roles:write"],
    isSystem: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "doctor",
    description: undefined,
    permissions: ["patients:read"],
    isSystem: false,
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("RoleList", () => {
  beforeEach(() => {
    vi.mocked(useRoles).mockReturnValue({
      data: roles,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteRole).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateRole).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateRole).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders role rows", () => {
    render(<RoleList />);
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("doctor")).toBeInTheDocument();
  });

  it("shows Sistem badge for system roles", () => {
    render(<RoleList />);
    const adminRow = screen.getByText("admin").closest("tr") as HTMLElement;
    expect(within(adminRow).getByText("Sistem")).toBeInTheDocument();
  });

  it("shows add button for roles:write permission", () => {
    render(<RoleList />);
    expect(screen.getByRole("button", { name: /Tambah Peran/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useRoles).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<RoleList />);
    expect(screen.queryByText("admin")).not.toBeInTheDocument();
  });

  it("shows empty state when no roles", () => {
    vi.mocked(useRoles).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<RoleList />);
    expect(screen.getByText("Tidak ada peran.")).toBeInTheDocument();
  });

  it("hides delete button for system roles", () => {
    render(<RoleList />);
    expect(screen.queryByLabelText("Hapus admin")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Hapus doctor")).toBeInTheDocument();
  });
});
