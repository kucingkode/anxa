import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductList } from "../components/product-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "l@simk.dev", name: "Logistic Admin", createdAt: "", updatedAt: "", role: { id: "r1", name: "logistic_admin", permissions: ["products:read", "products:write", "products:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-products", () => ({
  useProducts: vi.fn(),
  useProduct: vi.fn(),
  useCreateProduct: vi.fn(),
  useUpdateProduct: vi.fn(),
  useDeleteProduct: vi.fn(),
}));

vi.mock("@/features/manufacturers/hooks/use-manufacturers", () => ({
  useManufacturers: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "../hooks/use-products";
import { useManufacturers } from "@/features/manufacturers/hooks/use-manufacturers";

const products = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    code: "KFA-001",
    unit: "tablet",
    manufacturerId: "m1",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Amoxicillin 500mg",
    code: "KFA-002",
    unit: "strip",
    manufacturerId: "m2",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

const manufacturers = [
  { id: "m1", name: "Kimia Farma", identifier: "MF-001", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" },
  { id: "m2", name: "Bio Farma", identifier: "MF-002", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" },
];

describe("ProductList", () => {
  beforeEach(() => {
    vi.mocked(useProducts).mockReturnValue({
      data: products,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useManufacturers).mockReturnValue({
      data: manufacturers,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteProduct).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateProduct).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateProduct).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders product rows with manufacturer names", () => {
    render(<ProductList />);
    expect(screen.getByText("Paracetamol 500mg")).toBeInTheDocument();
    expect(screen.getByText("Amoxicillin 500mg")).toBeInTheDocument();
    expect(screen.getByText("Kimia Farma")).toBeInTheDocument();
    expect(screen.getByText("Bio Farma")).toBeInTheDocument();
  });

  it("shows add button for logistic_admin", () => {
    render(<ProductList />);
    expect(screen.getByRole("button", { name: /Tambah Produk/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useProducts).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ProductList />);
    expect(screen.queryByText("Paracetamol 500mg")).not.toBeInTheDocument();
  });

  it("shows empty state when no products", () => {
    vi.mocked(useProducts).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ProductList />);
    expect(screen.getByText("Tidak ada produk.")).toBeInTheDocument();
  });
});
