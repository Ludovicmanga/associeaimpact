import axios from "axios";
import { ProjectState } from "../types/types";

export const createProjectApiCall = async (project: {
    name: string;
    description: string;
    place: string;
    state: ProjectState;
    founderRole: string;
    stakes: string[];
    partnersWanted: {
        id: string;
        role: string;
        description: string;
    }[];
}) => {
     const res = await axios({
        url: 'http://localhost:8080/projects/create',
        method: 'post',
        withCredentials: true,
        data: project
    })
    return res; 
}

export const getAllProjectsApiCall = async () => {
    const res = await axios({
        url: 'http://localhost:8080/projects/get-all',
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}


export const getOneProjectApiCall = async (id: number) => {
    const res = await axios({
        url: 'http://localhost:8080/projects/get/' + id,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}