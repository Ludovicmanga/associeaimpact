import axios from "axios";
import { EntrepreneurialExperience } from "../types/enums";

export const editUserApiCall = async (data: {
    entrepreneurialExperience: EntrepreneurialExperience,
    name: string
}) => {
    const res = await axios({
        url: 'http://localhost:8080/users',
        method: 'patch',
        withCredentials: true,
        data
    })
    return res.data;
}