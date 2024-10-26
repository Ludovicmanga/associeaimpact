import axios from "axios";
import { EntrepreneurialExperience } from "../types/enums";

export const editUserApiCall = async (data: {
    entrepreneurialExperience: EntrepreneurialExperience,
    name: string
}) => {
    const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        method: 'patch',
        withCredentials: true,
        data
    })
    return res.data;
}