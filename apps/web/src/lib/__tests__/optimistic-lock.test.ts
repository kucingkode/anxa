import { describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import { notifyMutationError } from "../optimistic-lock";
import { ApiError } from "../errors";

vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

describe("notifyMutationError", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows a refresh action for 412 conflicts", () => {
    const onRefresh = vi.fn();
    notifyMutationError(new ApiError("version mismatch", 412), "fallback", onRefresh);

    expect(toast.error).toHaveBeenCalledWith(expect.stringContaining("Muat ulang"), {
      action: { label: "Muat ulang", onClick: onRefresh },
    });
  });

  it("shows the error message for non-412 errors", () => {
    notifyMutationError(new Error("Something broke"), "fallback");

    expect(toast.error).toHaveBeenCalledWith("Something broke");
  });

  it("falls back when the error has no message", () => {
    notifyMutationError("weird", "fallback");

    expect(toast.error).toHaveBeenCalledWith("fallback");
  });
});
