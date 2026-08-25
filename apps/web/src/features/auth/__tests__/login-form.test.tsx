import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "../components/login-form";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../hooks/use-login", () => ({
  useLogin: vi.fn(),
}));

import { useLogin } from "../hooks/use-login";

function renderLoginForm() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>,
  );
}

describe("LoginForm", () => {
  it("renders email and password fields and submit button", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      variables: undefined,
      reset: vi.fn(),
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      isIdle: true,
      status: "idle",
      submittedAt: 0,
      mutateAsync: vi.fn(),
    } as never);

    renderLoginForm();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Kata Sandi")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Masuk" })).toBeInTheDocument();
  });

  it("calls mutate on form submit", async () => {
    const mutate = vi.fn();
    vi.mocked(useLogin).mockReturnValue({
      mutate,
      isPending: false,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      variables: undefined,
      reset: vi.fn(),
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      isIdle: true,
      status: "idle",
      submittedAt: 0,
      mutateAsync: vi.fn(),
    } as never);

    renderLoginForm();

    await userEvent.type(screen.getByLabelText("Email"), "test@simk.dev");
    await userEvent.type(screen.getByLabelText("Kata Sandi"), "password123");
    await userEvent.click(screen.getByRole("button", { name: "Masuk" }));

    expect(mutate).toHaveBeenCalledWith({ email: "test@simk.dev", password: "password123" });
  });

  it("shows error message when login fails", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: true,
      isSuccess: false,
      error: new Error("Invalid credentials"),
      data: undefined,
      variables: undefined,
      reset: vi.fn(),
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      isIdle: false,
      status: "error",
      submittedAt: 0,
      mutateAsync: vi.fn(),
    } as never);

    renderLoginForm();

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
  });

  it("disables button and shows loading text while pending", () => {
    vi.mocked(useLogin).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
      isError: false,
      isSuccess: false,
      error: null,
      data: undefined,
      variables: undefined,
      reset: vi.fn(),
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      isIdle: false,
      status: "pending",
      submittedAt: 0,
      mutateAsync: vi.fn(),
    } as never);

    renderLoginForm();

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent("Memproses…");
  });
});