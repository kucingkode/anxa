import type { NewFollowUpVisit, FollowUpVisit } from "@simk/contracts";

export type CreateFollowUpVisitInput = NewFollowUpVisit;
export type CreateFollowUpVisitOutput = FollowUpVisit;

export type CreateFollowUpVisitUseCase = {
  createFollowUpVisit(
    input: CreateFollowUpVisitInput,
  ): Promise<CreateFollowUpVisitOutput>;
};
