import { useEffect, useState } from "react";

export interface Pagination {
  page: number;
  offset: number;
  limit: number;
  hasPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
}

/**
 * Offset-based pagination state. `resetKey` resets to the first page whenever
 * it changes (e.g. when the search query changes).
 */
export function usePagination(pageSize = 10, resetKey?: unknown): Pagination {
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [resetKey]);

  return {
    page,
    offset: page * pageSize,
    limit: pageSize,
    hasPrevious: page > 0,
    goToNext: () => setPage((p) => p + 1),
    goToPrevious: () => setPage((p) => Math.max(0, p - 1)),
  };
}
