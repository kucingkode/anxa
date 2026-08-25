import type { FollowUpVisit } from "@simk/contracts";

export type GetFollowUpVisitInput = {
  id: string;
};

export type GetFollowUpVisitOutput = FollowUpVisit;

export type GetFollowUpVisitUseCase = {
  getFollowUpVisit(
    input: GetFollowUpVisitInput,
  ): Promise<GetFollowUpVisitOutput>;
};
