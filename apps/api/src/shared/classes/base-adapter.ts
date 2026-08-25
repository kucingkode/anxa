import { InfrastructureError } from "../../domain/errors/infrastructure-errors.js";
import type { Logger } from "../../observability/logging.js";
import { createAdapterLogger } from "../utils/create-adapter-logger.js";
import { onError } from "../utils/on-error.js";

export class BaseAdapter {
  protected readonly log: Logger;
  protected readonly AdapterError: typeof InfrastructureError;

  constructor(
    port: string,
    direction: string,
    AdapterError: typeof InfrastructureError,
  ) {
    this.log = createAdapterLogger(this.constructor.name, port, direction);
    this.AdapterError = AdapterError;
  }

  protected async call<T>(
    fn: () => Promise<T> | T,
    msg: string,
    mapError?: (err: unknown) => Error | undefined,
  ): Promise<T> {
    return onError(fn, (err) => {
      const mapped = mapError?.(err);
      if (mapped) throw mapped;

      throw new this.AdapterError(msg, {
        cause: err,
      });
    });
  }
}
