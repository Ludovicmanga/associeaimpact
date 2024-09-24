export enum ProjectState {
    idea = 1,
    recentlyLaunched = 2,
    commercialSuccess = 3
}

export type Project = {
    id: number;
    name: string;
    description: string;
    place: string;
    state: number;
    founderRole: string;
    stakes: string[];
    partnersWanted: {
        role: string;
        description: string;
    }[];
    createdAt: Date;
}
