import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConditionReferenceList } from "../components/condition-reference-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "a@simk.dev", name: "Admin", createdAt: "", updatedAt: "", role: { id: "r1", name: "admin", permissions: ["condition-references:read", "condition-references:write", "condition-references:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-condition-references", () => ({
  useConditionReferences: vi.fn(),
  useConditionReference: vi.fn(),
  useCreateConditionReference: vi.fn(),
  useUpdateConditionReference: vi.fn(),
  useDeleteConditionReference: vi.fn(),
}));

import {
  useConditionReferences,
  useCreateConditionReference,
  useDeleteConditionReference,
  useUpdateConditionReference,
} from "../hooks/use-condition-references";

const references = [
  {
    id: "1",
    code: "A00",
    display: "Kolera",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    code: "J45",
    display: "Asma",
    createdAt: "2026-01-02T00:00:00Z",
    updatedAt: "2026-01-02T00:00:00Z",
  },
];

describe("ConditionReferenceList", () => {
  beforeEach(() => {
    vi.mocked(useConditionReferences).mockReturnValue({
      data: references,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeleteConditionReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateConditionReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateConditionReference).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders condition reference rows", () => {
    render(<ConditionReferenceList />);
    expect(screen.getByText("A00")).toBeInTheDocument();
    expect(screen.getByText("Kolera")).toBeInTheDocument();
    expect(screen.getByText("Asma")).toBeInTheDocument();
  });

  it("shows add button for admin", () => {
    render(<ConditionReferenceList />);
    expect(screen.getByRole("button", { name: /Tambah Referensi/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useConditionReferences).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ConditionReferenceList />);
    expect(screen.queryByText("Kolera")).not.toBeInTheDocument();
  });

  it("shows empty state when no references", () => {
    vi.mocked(useConditionReferences).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ConditionReferenceList />);
    expect(screen.getByText("Tidak ada referensi kondisi.")).toBeInTheDocument();
  });
});
