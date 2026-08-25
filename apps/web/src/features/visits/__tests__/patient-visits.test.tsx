import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PatientVisits } from "../components/patient-visits";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "d@simk.dev", name: "Doctor", createdAt: "", updatedAt: "", role: { id: "r1", name: "doctor", permissions: ["follow-up-visits:read", "follow-up-visits:write"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-visits", () => ({
  visitsKey: ["visits"],
  useVisits: vi.fn(),
  useVisit: vi.fn(),
  usePatientVisits: vi.fn(),
}));

vi.mock("@/features/follow-up-visits/hooks/use-follow-up-visits", () => ({
  followUpVisitsKey: ["follow-up-visits"],
  useFollowUpVisits: vi.fn(),
  useCreateFollowUpVisit: vi.fn(),
  useUpdateFollowUpVisit: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import { usePatientVisits } from "../hooks/use-visits";
import {
  useCreateFollowUpVisit,
  useFollowUpVisits,
  useUpdateFollowUpVisit,
} from "@/features/follow-up-visits/hooks/use-follow-up-visits";

const visits = [
  {
    id: "v1",
    patientId: "p1",
    status: "finished" as const,
    class: "AMB",
    periodStart: "2026-01-01T08:00:00Z",
    periodEnd: "2026-01-01T09:00:00Z",
    createdAt: "",
    updatedAt: "",
  },
];

const followUps = [
  {
    id: "f1",
    patientId: "p1",
    date: "2026-02-01T10:00:00Z",
    status: "booked" as const,
    reason: "Kontrol",
    createdAt: "",
    updatedAt: "",
  },
];

describe("PatientVisits", () => {
  beforeEach(() => {
    vi.mocked(usePatientVisits).mockReturnValue({
      data: visits,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useFollowUpVisits).mockReturnValue({
      data: followUps,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useUpdateFollowUpVisit).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateFollowUpVisit).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders visit rows", () => {
    render(<PatientVisits patientId="p1" />);
    expect(screen.getByText("Kunjungan")).toBeInTheDocument();
    expect(screen.getByText("AMB")).toBeInTheDocument();
    expect(screen.getByText("Kelas")).toBeInTheDocument();
  });

  it("renders follow-up section", () => {
    render(<PatientVisits patientId="p1" />);
    expect(screen.getByText("Kunjungan Lanjutan")).toBeInTheDocument();
    expect(screen.getByText("Kontrol")).toBeInTheDocument();
    expect(screen.getByText("Terjadwal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tambah Kunjungan Lanjutan/ })).toBeInTheDocument();
  });

  it("shows empty state when no visits", () => {
    vi.mocked(usePatientVisits).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<PatientVisits patientId="p1" />);
    expect(screen.getByText("Tidak ada kunjungan.")).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(usePatientVisits).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<PatientVisits patientId="p1" />);
    expect(screen.queryByText("AMB")).not.toBeInTheDocument();
  });
});
