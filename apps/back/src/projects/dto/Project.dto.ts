export class Project {
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
}
