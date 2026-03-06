import { makeHttpRequest } from "./api";

export const register = async(userData) => {
    return await makeHttpRequest("/auth/register", "POST", userData)
}

export const login = async(userData) => {
    return await makeHttpRequest("/auth/login", "POST", userData)
}

export const logout = async() => {
    return await makeHttpRequest("/auth/logout", "POST")
}

export const checkLogin = async() => {
    return await makeHttpRequest("/auth/me")
}