import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcedureReferenceList } from "../components/procedure-reference-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "a@simk.dev", name: "Admin", createdAt: "", updatedAt: "", role: { id: "r1", name: "admin", permissions: ["procedure-references:read", "procedure-references:write", "procedure-references:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-procedure-references", () => ({
  useProcedureReferences: vi.fn(),
  useProcedureReference: vi.fn(),
  useCreateProcedureReference: vi.fn(),
  useUpdateProcedureReference: vi.fn(),
  useDeleteProcedureReference: vi.fn(),
}));

import {
  useCreateProcedureReference,
  useDeleteProcedureReference,
  useProcedureReferences,
  useUpdateProcedureReference,
} from "../hooks/use-procedure-references";

const references = [
  {
    id: "1",
    code: "0FJC0ZZ",
    display: "Reseksi",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    code: "0BH17EZ",
    display: "Endoskopi",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("ProcedureReferenceList", () => {
  beforeEach(() => {
    vi.mocked(useProcedureReferences).mockReturnValue({
      data: references,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteProcedureReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateProcedureReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateProcedureReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders procedure reference rows", () => {
    render(<ProcedureReferenceList />);
    expect(screen.getByText("0FJC0ZZ")).toBeInTheDocument();
    expect(screen.getByText("Reseksi")).toBeInTheDocument();
    expect(screen.getByText("Endoskopi")).toBeInTheDocument();
  });

  it("shows add button for admin", () => {
    render(<ProcedureReferenceList />);
    expect(screen.getByRole("button", { name: /Tambah Referensi/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useProcedureReferences).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ProcedureReferenceList />);
    expect(screen.queryByText("Reseksi")).not.toBeInTheDocument();
  });

  it("shows empty state when no references", () => {
    vi.mocked(useProcedureReferences).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ProcedureReferenceList />);
    expect(screen.getByText("Tidak ada referensi prosedur.")).toBeInTheDocument();
  });
});
