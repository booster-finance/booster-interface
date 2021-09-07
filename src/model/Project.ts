
export default interface Milestone {
    title:string
    // timespan:number
    objectives: string[]
}


export interface Project {
    id:number
    status: ProjectPhase
    title:string
    description:string
    link:string 
    tiers: Tier[]
    milestones:Array<Milestone>
}

export enum ProjectPhase {
    Edit = 1,
    Investment,
    Spending,
    Payout
}


export interface Tier {
    cost:number,
    rewards: Reward[]
}

export interface Reward {
    title: string,
    description: string
}