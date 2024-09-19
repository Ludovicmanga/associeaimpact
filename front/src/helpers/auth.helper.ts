import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';

export const loginWithLocal = async (email: string, password: string) => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/auth/login',
            method: 'post',
            withCredentials: true,
            data: {
                email,
                password
            }
        })
        return res.data;
    } catch(e) {
        console.log(e, ' is the error !!!')
    }
}

export const loginWithGoogleApiCall = async (access_token: string) => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/auth/login-google',
            method: 'post',
            withCredentials: true,
            data: {
                access_token
            }
        })
        return res.data;
    } catch(e) {
        console.log(e, ' is the error !!!')
    }
}

export const checkAuthApiCall = async () => {
    const res = await axios({
        url: 'http://localhost:8080/auth/check-auth',
        method: 'get',
        withCredentials: true,
    })
    return res;
}

export const logoutApiCall = async () => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/auth/logout',
            method: 'post',
            withCredentials: true,
        })
        return res;
    } catch(e) {}
}