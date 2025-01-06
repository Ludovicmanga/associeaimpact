import axios from "axios";
import { Conversation } from "../types/types";

export const getAllUserConversations = async () => {
    const res = await axios<Conversation[]>({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/conversations/get-user-conversations`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const getConversationBetweenUserAndInterlocutor = async (interlocutorId: number) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/conversations/get-conversation-between-interlocutors/${interlocutorId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const createConversation = async (interlocutorId: number) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/conversations/create`,
        method: 'post',
        withCredentials: true,
        data: {
            interlocutorId
        }
    })
    return res.data; 
}

/* export const checkUserHasAccessToConversation = async (conversationId: number) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/conversations/check-user-has-access/${conversationId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}
 */