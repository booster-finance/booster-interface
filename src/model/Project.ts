export interface Milestone {
  releaseDate: number;
  releasePercentage: number;
  releaseAlloc: number;
}

export interface Project {
  id: number;
  status: ProjectPhase;
  title: string;
  description: string;
  fundingGoal: number;
  link: string;
  tiers: Tier[];
  milestones: Milestone[];
}

export enum ProjectPhase {
  Investment = 0,
  Working,
  Voting,
  Completed,
}

export interface Tier {
  backers: number;
  maxBackers: number;
  cost: number;
  // rewards: Reward[];
}

export interface Reward {
  title: string;
  description: string;
}
