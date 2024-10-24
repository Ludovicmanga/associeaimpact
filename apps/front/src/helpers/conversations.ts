import axios from "axios";
import { Conversation } from "../types/types";

export const getAllUserConversations = async () => {
    const res = await axios<Conversation[]>({
        url: 'http://localhost:8080/api/conversations/get-user-conversations',
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const getConversationBetweenUserAndInterlocutor = async (interlocutorId: number) => {
    const res = await axios({
        url: `http://localhost:8080/api/conversations/get-conversation-between-interlocutors/${interlocutorId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const createConversation = async (interlocutorId: number) => {
    const res = await axios({
        url: `http://localhost:8080/api/conversations/create`,
        method: 'post',
        withCredentials: true,
        data: {
            interlocutorId
        }
    })
    return res.data; 
}

export const checkUserHasAccessToConversation = async (conversationId: number) => {
    const res = await axios({
        url: `http://localhost:8080/api/conversations/check-user-has-access/${conversationId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}
