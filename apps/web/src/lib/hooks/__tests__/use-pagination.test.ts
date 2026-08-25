import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "../use-pagination";

describe("usePagination", () => {
  it("starts at page 0 with offset 0", () => {
    const { result } = renderHook(() => usePagination(10));
    expect(result.current.page).toBe(0);
    expect(result.current.offset).toBe(0);
    expect(result.current.limit).toBe(10);
    expect(result.current.hasPrevious).toBe(false);
  });

  it("advances and rewinds the page", () => {
    const { result } = renderHook(() => usePagination(10));

    act(() => result.current.goToNext());
    expect(result.current.page).toBe(1);
    expect(result.current.offset).toBe(10);
    expect(result.current.hasPrevious).toBe(true);

    act(() => result.current.goToPrevious());
    expect(result.current.page).toBe(0);
    expect(result.current.offset).toBe(0);
  });

  it("never goes below page 0", () => {
    const { result } = renderHook(() => usePagination(10));
    act(() => result.current.goToPrevious());
    expect(result.current.page).toBe(0);
  });

  it("resets to page 0 when the reset key changes", () => {
    const { result, rerender } = renderHook(({ key }) => usePagination(10, key), {
      initialProps: { key: "a" },
    });

    act(() => result.current.goToNext());
    act(() => result.current.goToNext());
    expect(result.current.page).toBe(2);

    rerender({ key: "b" });
    expect(result.current.page).toBe(0);
  });
});
