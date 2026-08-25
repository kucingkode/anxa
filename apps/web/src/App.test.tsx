import { describe, expect, it, vi } from "vitest";

vi.mock("./routeTree.gen", () => ({ routeTree: {} }));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...actual,
    RouterProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    createRouter: () =>
      ({
        load: vi.fn().mockResolvedValue(undefined),
        subscribe: vi.fn(() => vi.fn()),
        state: { matches: [], status: "idle" },
        matchRoutes: vi.fn(),
        buildLocation: vi.fn(),
      }) as unknown as ReturnType<typeof actual.createRouter>,
  };
});

vi.mock("@tanstack/react-query", () => ({
  QueryClientProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  QueryClient: vi.fn(() => ({})),
}));

import { render } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });
});