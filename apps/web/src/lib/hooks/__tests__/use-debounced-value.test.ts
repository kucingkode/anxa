import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedValue } from "../use-debounced-value";

describe("useDebouncedValue", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedValue("a"));
    expect(result.current).toBe("a");
  });

  it("keeps the previous value until the delay elapses", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: "a" },
    });

    rerender({ value: "ab" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("ab");
  });

  it("cancels pending updates when the value changes again", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value), {
      initialProps: { value: "" },
    });

    rerender({ value: "a" });
    act(() => vi.advanceTimersByTime(150));
    rerender({ value: "ab" });
    act(() => vi.advanceTimersByTime(150));

    expect(result.current).toBe("");

    act(() => vi.advanceTimersByTime(150));
    expect(result.current).toBe("ab");
  });
});
