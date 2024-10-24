import axios from "axios";
import { ProjectState } from "../types/types";

export const createProjectApiCall = async (data: {
    name: string;
    description: string;
    place: google.maps.places.PlaceResult | null;
    state: ProjectState;
    founderRole: string;
    stakes: string[];
    partnersWanted: {
        id: string;
        role: string;
        description: string;
    }[];
}) => {
    console.log('before res')

     const res = await axios({
        url: 'http://localhost:8080/api/projects/create',
        method: 'post',
        withCredentials: true,
        data
    });
    return res; 
}

export const editProjectApiCall = async (data: {
    id: number;
    name: string;
    description: string;
    place: google.maps.places.PlaceResult | null;
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
        url: 'http://localhost:8080/api/projects/edit',
        method: 'patch',
        withCredentials: true,
        data
    })
    return res; 
}

export const deleteProjectApiCall = async (id: number) => {
    const res = await axios({
        url: 'http://localhost:8080/api/projects/delete/' + id,
        method: 'delete',
        withCredentials: true,
    })
    return res.data; 
}

export const getAllProjectsApiCall = async () => {
    const res = await axios({
        url: 'http://localhost:8080/api/projects/get-all',
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const getProjectsCreatedByLoggedUserApiCall = async () => {
    const res = await axios({
        url: 'http://localhost:8080/api/projects/get-created-by-logged-user',
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const getOneProjectApiCall = async (id: number) => {
    const res = await axios({
        url: 'http://localhost:8080/api/projects/get/' + id,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}