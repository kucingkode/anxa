import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConditionList } from "../components/condition-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "d@simk.dev", name: "Doctor", createdAt: "", updatedAt: "", role: { id: "r1", name: "doctor", permissions: ["conditions:read", "conditions:write", "conditions:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-conditions", () => ({
  useConditions: vi.fn(),
  useCondition: vi.fn(),
  useCreateCondition: vi.fn(),
  useUpdateCondition: vi.fn(),
  useDeleteCondition: vi.fn(),
}));

import {
  useConditions,
  useCreateCondition,
  useDeleteCondition,
  useUpdateCondition,
} from "../hooks/use-conditions";

const conditions = [
  {
    id: "1",
    patientId: "p1",
    visitId: "v1",
    code: "E11.9",
    codeDisplay: "Diabetes mellitus tipe 2",
    clinicalStatus: "active",
    notes: "Kontrol gula darah",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    patientId: "p1",
    visitId: "v1",
    code: "I10",
    clinicalStatus: "resolved",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("ConditionList", () => {
  beforeEach(() => {
    vi.mocked(useConditions).mockReturnValue({
      data: conditions,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteCondition).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateCondition).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateCondition).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders condition rows", () => {
    render(<ConditionList patientId="p1" visitId="v1" />);
    expect(screen.getByText("E11.9")).toBeInTheDocument();
    expect(screen.getByText("Diabetes mellitus tipe 2")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("shows add button for doctor", () => {
    render(<ConditionList patientId="p1" visitId="v1" />);
    expect(screen.getByRole("button", { name: /Tambah Kondisi/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useConditions).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ConditionList patientId="p1" visitId="v1" />);
    expect(screen.queryByText("E11.9")).not.toBeInTheDocument();
  });

  it("shows empty state when no conditions", () => {
    vi.mocked(useConditions).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ConditionList patientId="p1" visitId="v1" />);
    expect(screen.getByText("Tidak ada kondisi.")).toBeInTheDocument();
  });
});
