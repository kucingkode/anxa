import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import { routeTree } from "@/routeTree.gen";
import type { ReactElement } from "react";

function createTestRouter(initialEntries: string[] = ["/"]) {
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries }),
  });
}

export function renderWithProviders(ui: ReactElement, { initialEntries = ["/"] }: { initialEntries?: string[] } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const router = createTestRouter(initialEntries);

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>,
    ),
    queryClient,
    router,
  };
}

export { screen, waitFor };
export { userEvent };