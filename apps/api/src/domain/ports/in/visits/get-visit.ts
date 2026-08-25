import type { Visit } from "@simk/contracts";

export type GetVisitInput = {
  id: string;
};

export type GetVisitOutput = Visit;

export type GetVisitUseCase = {
  getVisit(input: GetVisitInput): Promise<GetVisitOutput>;
};
