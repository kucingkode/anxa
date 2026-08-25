import { describe, expect, it } from "vitest";
import { ApiError, getErrorMessage, isApiError } from "../errors";

describe("getErrorMessage", () => {
  it("reads Error.message", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("reads a message property on plain objects", () => {
    expect(getErrorMessage({ message: "plain" })).toBe("plain");
  });

  it("falls back for unknown shapes", () => {
    expect(getErrorMessage(null, "fallback")).toBe("fallback");
  });
});

describe("ApiError", () => {
  it("preserves status code and message", () => {
    const error = new ApiError("conflict", 412);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("conflict");
    expect(error.statusCode).toBe(412);
  });
});

describe("isApiError", () => {
  it("matches ApiError instances only", () => {
    expect(isApiError(new ApiError("x", 409))).toBe(true);
    expect(isApiError(new Error("x"))).toBe(false);
    expect(isApiError({ message: "x" })).toBe(false);
  });

  it("optionally filters by status code", () => {
    expect(isApiError(new ApiError("x", 412), 412)).toBe(true);
    expect(isApiError(new ApiError("x", 409), 412)).toBe(false);
  });
});
