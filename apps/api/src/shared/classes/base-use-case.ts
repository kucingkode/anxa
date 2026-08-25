import type { Logger } from "../../observability/logging.js";
import { createUseCaseLogger } from "../utils/create-use-case-logger.js";

export class BaseUseCase {
  protected readonly log: Logger;

  constructor(useCase: string) {
    this.log = createUseCaseLogger(this.constructor.name, useCase);
  }
}
