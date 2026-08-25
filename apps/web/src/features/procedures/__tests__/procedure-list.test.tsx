import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcedureList } from "../components/procedure-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "d@simk.dev", name: "Doctor", createdAt: "", updatedAt: "", role: { id: "r1", name: "doctor", permissions: ["procedures:read", "procedures:write", "procedures:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-procedures", () => ({
  useProcedures: vi.fn(),
  useProcedure: vi.fn(),
  useCreateProcedure: vi.fn(),
  useUpdateProcedure: vi.fn(),
  useDeleteProcedure: vi.fn(),
}));

import {
  useProcedures,
  useCreateProcedure,
  useDeleteProcedure,
  useUpdateProcedure,
} from "../hooks/use-procedures";

const procedures = [
  {
    id: "1",
    patientId: "p1",
    visitId: "v1",
    code: "00.01",
    codeDisplay: "Terapi infus",
    status: "completed",
    performedAt: "2026-01-01T08:00:00Z",
    notes: "Infus RL 500ml",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    patientId: "p1",
    visitId: "v1",
    code: "00.02",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("ProcedureList", () => {
  beforeEach(() => {
    vi.mocked(useProcedures).mockReturnValue({
      data: procedures,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteProcedure).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateProcedure).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateProcedure).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders procedure rows", () => {
    render(<ProcedureList patientId="p1" visitId="v1" />);
    expect(screen.getByText("00.01")).toBeInTheDocument();
    expect(screen.getByText("Terapi infus")).toBeInTheDocument();
    expect(screen.getByText("completed")).toBeInTheDocument();
  });

  it("shows add button for doctor", () => {
    render(<ProcedureList patientId="p1" visitId="v1" />);
    expect(screen.getByRole("button", { name: /Tambah Tindakan/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useProcedures).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ProcedureList patientId="p1" visitId="v1" />);
    expect(screen.queryByText("00.01")).not.toBeInTheDocument();
  });

  it("shows empty state when no procedures", () => {
    vi.mocked(useProcedures).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ProcedureList patientId="p1" visitId="v1" />);
    expect(screen.getByText("Tidak ada tindakan.")).toBeInTheDocument();
  });
});
