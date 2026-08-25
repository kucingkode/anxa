import type { FollowUpVisit, UpdateFollowUpVisit } from "@simk/contracts";

export type UpdateFollowUpVisitInput = {
  id: string;
  changes: UpdateFollowUpVisit;
};

export type UpdateFollowUpVisitOutput = FollowUpVisit;

export type UpdateFollowUpVisitUseCase = {
  updateFollowUpVisit(
    input: UpdateFollowUpVisitInput,
  ): Promise<UpdateFollowUpVisitOutput>;
};
