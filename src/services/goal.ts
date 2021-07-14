import axiosConfig from "../configs/axiosConfig";

export enum GoalType {
  ACCOUNT = "ACCOUNT",
  GOAL = "GOAL"
}

export type TransferGoalDto = {
  fromGoalId: string;
  fromGoalType: GoalType;
  toGoalId: string;
  toGoalType: GoalType;
  transferAmount: number;
  itemId?: string;
};

export type CreateGoalDto = {
  accountId: string;
  name: string;
  goalAmount: number;
};

export async function getGoal() {
  const response = await axiosConfig.get("/goal");
  return response.data;
}

export async function goalTransfer(goalData: TransferGoalDto): Promise<void> {
  await axiosConfig.post("/goal/transfer", goalData);
  return;
}

export async function postGoal(goadlData: CreateGoalDto): Promise<void> {
  await axiosConfig.post("/goal", goadlData);
  return;
}

export async function deleteGoal(goalID: string): Promise<void> {
  await axiosConfig.delete(`/goal/${goalID}`);
  return;
}
