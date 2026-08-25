import { getLogger } from "../../observability/logging.js";

export function createAdapterLogger(
  component: string,
  port: string,
  direction: string,
) {
  return getLogger().child({
    component,
    port,
    direction,
  });
}
