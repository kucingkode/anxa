import type { FollowUpVisit } from "@simk/contracts";

export type ListFollowUpVisitsInput = {
  limit?: number;
  offset?: number;
  patientId?: string;
  status?: FollowUpVisit["status"];
  date?: string;
};

export type ListFollowUpVisitsOutput = FollowUpVisit[];

export type ListFollowUpVisitsUseCase = {
  listFollowUpVisits(
    input: ListFollowUpVisitsInput,
  ): Promise<ListFollowUpVisitsOutput>;
};
