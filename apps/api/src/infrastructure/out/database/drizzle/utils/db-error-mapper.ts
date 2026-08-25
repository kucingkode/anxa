import { DatabaseError } from "pg";

export function pgMapper(map: Partial<Record<string, () => Error>>) {
  return (err: unknown) => {
    if (
      err instanceof Error &&
      err.cause instanceof DatabaseError &&
      err.cause.code
    ) {
      return map[err.cause.code]?.();
    }
  };
}
