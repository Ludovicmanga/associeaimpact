import axios from "axios";
import Cookies from 'js-cookie';

export const loginWithLocal = async (email: string, password: string) => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/auth/login',
            method: 'post',
            withCredentials: true,
            data: {
                username: email,
                password
            }
        })
        if (res.data) {
            console.log(res.data, ' is the res')
        }
    } catch(e) {
        console.log(e, ' is the error !!!')
    }
}

export const accessProfileApiCall = async () => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/profile',
            method: 'get',
            withCredentials: true,
        })
        if (res.data) {
            console.log(res.data, ' is the profile res')
        }
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
        if (res.data) {
            console.log(res.data, ' is the profile res from google login')
        }
    } catch(e) {
        console.log(e, ' is the error !!!')
    }
}
