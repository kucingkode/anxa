import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueueList } from "../components/queue-list";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

vi.mock("@/lib/auth", () => ({
  useAuth: () => ({ user: { id: "1", email: "p@simk.dev", name: "Paramedic", createdAt: "", updatedAt: "", role: { id: "r1", name: "paramedic", permissions: ["queues:read", "queues:write", "queues:delete"], isSystem: true, createdAt: "", updatedAt: "" } }, isAuthenticated: true }),
}));

vi.mock("../hooks/use-queues", () => ({
  queuesKey: ["queues"],
  useQueues: vi.fn(),
  useQueue: vi.fn(),
  useCreateQueue: vi.fn(),
  useUpdateQueue: vi.fn(),
  useDeleteQueue: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

vi.mock("@/features/patients/hooks/use-patients", () => ({
  usePatients: vi.fn(),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return { ...actual, Link: ({ children }: { children?: React.ReactNode }) => <a>{children}</a> };
});

import { useCreateQueue, useDeleteQueue, useQueues, useUpdateQueue } from "../hooks/use-queues";
import { usePatients } from "@/features/patients/hooks/use-patients";

const patients = [
  { id: "p1", name: "Budi Santoso", identifier: "1", gender: "male" as const, createdAt: "" },
  { id: "p2", name: "Siti Aminah", identifier: "2", gender: "female" as const, createdAt: "" },
];

const queues = [
  { id: "q1", patientId: "p1", status: "waiting" as const, version: 1, createdAt: "", updatedAt: "" },
  { id: "q2", patientId: "p2", status: "in-service" as const, version: 2, createdAt: "", updatedAt: "" },
];

describe("QueueList", () => {
  beforeEach(() => {
    vi.mocked(useQueues).mockReturnValue({
      data: queues,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(usePatients).mockReturnValue({
      data: patients,
      isLoading: false,
      isError: false,
      error: null,
    } as never);
    vi.mocked(useUpdateQueue).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useDeleteQueue).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
    vi.mocked(useCreateQueue).mockReturnValue({ mutate: vi.fn(), isPending: false } as never);
  });

  it("renders queue rows with patient names", () => {
    render(<QueueList />);
    expect(screen.getByText("Budi Santoso")).toBeInTheDocument();
    expect(screen.getByText("Siti Aminah")).toBeInTheDocument();
  });

  it("shows add button for paramedic", () => {
    render(<QueueList />);
    expect(screen.getByRole("button", { name: /Tambah Antrean/ })).toBeInTheDocument();
  });

  it("shows loading skeleton when loading", () => {
    vi.mocked(useQueues).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as never);

    render(<QueueList />);
    expect(screen.queryByText("Budi Santoso")).not.toBeInTheDocument();
  });

  it("shows empty state when no queues", () => {
    vi.mocked(useQueues).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as never);

    render(<QueueList />);
    expect(screen.getByText("Tidak ada antrean.")).toBeInTheDocument();
  });
});
