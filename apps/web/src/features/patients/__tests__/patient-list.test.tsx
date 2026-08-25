import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PatientList } from "../components/patient-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "p@simk.dev", name: "Paramedic", createdAt: "", updatedAt: "", role: { id: "r1", name: "paramedic", permissions: ["patients:read", "patients:write", "patients:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-patients", () => ({
  usePatients: vi.fn(),
  usePatient: vi.fn(),
  useCreatePatient: vi.fn(),
  useUpdatePatient: vi.fn(),
  useDeletePatient: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import { useCreatePatient, useDeletePatient, usePatients, useUpdatePatient } from "../hooks/use-patients";

const patients = [
  {
    id: "1",
    name: "Budi Santoso",
    identifier: "3273010101010001",
    gender: "male" as const,
    phone: "08123456789",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Siti Aminah",
    identifier: "3273010101010002",
    gender: "female" as const,
    createdAt: "2026-01-02T00:00:00Z",
  },
];

describe("PatientList", () => {
  beforeEach(() => {
    vi.mocked(usePatients).mockReturnValue({
      data: patients,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useDeletePatient).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreatePatient).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useUpdatePatient).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders patient rows", () => {
    render(<PatientList />);
    expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
    expect(screen.getByText("Siti Aminah")).toBeInTheDocument();
  });

  it("shows add button for paramedic", () => {
    render(<PatientList />);
    expect(screen.getByRole("button", { name: /Tambah Pasien/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(usePatients).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<PatientList />);
    expect(screen.queryByText("Budi Santoso")).not.toBeInTheDocument();
  });

  it("shows empty state when no patients", () => {
    vi.mocked(usePatients).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<PatientList />);
    expect(screen.getByText("Tidak ada pasien.")).toBeInTheDocument();
  });
});
