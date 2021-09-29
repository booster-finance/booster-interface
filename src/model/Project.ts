export interface Milestone {
  releaseDate: number;
  releasePercentage: number;
}

export interface Project {
  address: string;
  creator: string;
  status: ProjectPhase;
  title: string;
  description: string;
  fundingGoal: number;
  totalFunding: number;
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
  address: string;
  backers: number;
  maxBackers: number;
  cost: number;
}
