export enum ProjectState {
    idea = 1,
    recentlyLaunched = 2,
    commercialSuccess = 3
}

export type Project = {
    id: number;
    name: string;
    description: string;
    place: google.maps.places.PlaceResult;
    state: number;
    founderRole: string;
    stakes: string[];
    partnersWanted: {
        role: string;
        description: string;
    }[];
    createdAt: Date;
}

export type Filter = {
    id: string;
    type: "city" | "stake";
    value: string;
}

export type Conversation = {
    id: number;
    interlocutorName: string;
    unreadCount: number;
    preview: string;
} 