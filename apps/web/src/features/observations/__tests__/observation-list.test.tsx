import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ObservationList } from "../components/observation-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "d@simk.dev", name: "Doctor", createdAt: "", updatedAt: "", role: { id: "r1", name: "doctor", permissions: ["observations:read", "observations:write", "observations:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-observations", () => ({
  observationsKey: ["observations"],
  useObservations: vi.fn(),
  useObservation: vi.fn(),
  useCreateObservation: vi.fn(),
  useUpdateObservation: vi.fn(),
  useUpdateObservationStatus: vi.fn(),
  useDeleteObservation: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import {
  useCreateObservation,
  useDeleteObservation,
  useObservations,
  useUpdateObservation,
  useUpdateObservationStatus,
} from "../hooks/use-observations";

const observations = [
  {
    id: "1",
    patientId: "p1",
    visitId: "v1",
    code: "8867-4",
    codeDisplay: "Heart rate",
    value: 80,
    unit: "/min",
    status: "preliminary" as const,
    interpretation: "normal",
    version: 0,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    patientId: "p1",
    visitId: "v1",
    code: "85354-9",
    value: 120,
    unit: "mmHg",
    status: "final" as const,
    version: 1,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
  },
];

describe("ObservationList", () => {
  beforeEach(() => {
    vi.mocked(useObservations).mockReturnValue({
      data: observations,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useUpdateObservationStatus).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useDeleteObservation).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateObservation).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdateObservation).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders observation rows", () => {
    render(<ObservationList patientId="p1" visitId="v1" />);
    expect(screen.getByText("8867-4")).toBeInTheDocument();
    expect(screen.getByText("85354-9")).toBeInTheDocument();
    expect(screen.getByText("80 /min")).toBeInTheDocument();
  });

  it("shows add button for doctor", () => {
    render(<ObservationList patientId="p1" visitId="v1" />);
    expect(screen.getByRole("button", { name: /Tambah Observasi/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useObservations).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<ObservationList patientId="p1" visitId="v1" />);
    expect(screen.queryByText("8867-4")).not.toBeInTheDocument();
  });

  it("shows empty state when no observations", () => {
    vi.mocked(useObservations).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<ObservationList patientId="p1" visitId="v1" />);
    expect(screen.getByText("Tidak ada observasi.")).toBeInTheDocument();
  });
});
