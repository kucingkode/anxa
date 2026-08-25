import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ManufacturerList } from "../components/manufacturer-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "l@simk.dev", name: "Logistic Admin", createdAt: "", updatedAt: "", role: { id: "r1", name: "logistic_admin", permissions: ["manufacturers:read", "manufacturers:write", "manufacturers:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-manufacturers", () => ({
  useManufacturers: vi.fn(),
  useManufacturer: vi.fn(),
  useCreateManufacturer: vi.fn(),
  useUpdateManufacturer: vi.fn(),
  useDeleteManufacturer: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import {
  useCreateManufacturer,
  useDeleteManufacturer,
  useManufacturers,
  useUpdateManufacturer,
} from "../hooks/use-manufacturers";

const manufacturers = [
  {
    id: "1",
    name: "Kimia Farma",
    identifier: "MF-001",
    contact: "021-123456",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Bio Farma",
    identifier: "MF-002",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("ManufacturerList", () => {
  beforeEach(() => {
    vi.mocked(useManufacturers).mockReturnValue({
      data: manufacturers,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteManufacturer).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateManufacturer).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateManufacturer).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders manufacturer rows", () => {
    render(<ManufacturerList />);
    expect(screen.getByText("Kimia Farma")).toBeInTheDocument();
    expect(screen.getByText("Bio Farma")).toBeInTheDocument();
    expect(screen.getByText("021-123456")).toBeInTheDocument();
  });

  it("shows add button for logistic_admin", () => {
    render(<ManufacturerList />);
    expect(screen.getByRole("button", { name: /Tambah Manufaktur/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useManufacturers).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ManufacturerList />);
    expect(screen.queryByText("Kimia Farma")).not.toBeInTheDocument();
  });

  it("shows empty state when no manufacturers", () => {
    vi.mocked(useManufacturers).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ManufacturerList />);
    expect(screen.getByText("Tidak ada manufaktur.")).toBeInTheDocument();
  });
});
