import axios from "axios";

export const createMessage = async (args: {content: string, conversationId: number }) => {
    const res = await axios({
        url: `http://localhost:8080/api/messages/create`,
        method: 'post',
        withCredentials: true,
        data: args
    })
    return res.data; 
}

export const getConversationMessages = async (conversationId: number) => {
    const res = await axios({
        url: `http://localhost:8080/api/messages/get-conversation-messages/${conversationId}`,
        method: 'get',
        withCredentials: true,
    })
    return res.data; 
}
