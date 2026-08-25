import { getLogger } from "../../observability/logging.js";

export function createUseCaseLogger(component: string, useCase: string) {
  return getLogger().child({
    component,
    useCase,
  });
}
