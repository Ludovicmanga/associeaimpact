import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie';
import { setSnackBar } from "../redux/snackbarSlice";
import { EntrepreneurialExperience } from "../types/enums";

export const loginWithLocal = async (email: string, password: string, dispatch: Dispatch) => {
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
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                dispatch(setSnackBar({
                    isOpen: true,
                    severity: "error",
                    message: 'Whoops ! Email ou identifiants incorrects'
                }))
            }
        }
        console.log(e, ' is the error !!!')
    }
}

export const signUpWithLocalApiCall = async (email: string, password: string, name: string, entrepreneurialExperience: EntrepreneurialExperience, dispatch: Dispatch) => {
    try {
        const res = await axios({
            url: 'http://localhost:8080/auth/sign-up',
            method: 'post',
            withCredentials: true,
            data: {
                email,
                password,
                name,
                entrepreneurialExperience
            }
        })
        return res.data;
    } catch(e) {
        if (e instanceof AxiosError) {
            if (e.status === 401) {
                dispatch(setSnackBar({
                    isOpen: true,
                    severity: "error",
                    message: "Whoops ! Une erreur s'est produite dans votre inscription"
                }))
            }
        }
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