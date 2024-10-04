import axios from "axios";

export const getAllUserConversations = async () => {
    const res = await axios({
        url: 'http://localhost:8080/conversations/get-user-conversations',
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const getConversationBetweenUserAndInterlocutor = async (interlocutorId: number) => {
    const res = await axios({
        url: `http://localhost:8080/conversations/get-conversation-between-interlocutors/${interlocutorId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}

export const createConversation = async (interlocutorId: number) => {
    const res = await axios({
        url: `http://localhost:8080/conversations/create`,
        method: 'post',
        withCredentials: true,
        data: {
            interlocutorId
        }
    })
    return res.data; 
}
