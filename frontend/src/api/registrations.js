import { makeHttpRequest } from "./api";

export const registerForEvent = async(id) => {
    return await makeHttpRequest(`/registrations/events/${id}`, "POST")
}

export const cancelRegistration = async(id) => {
    return await makeHttpRequest(`/registrations/events/${id}`, "DELETE")
}

export const getEventsRegisteredFor = async() => {
    return await makeHttpRequest("/registrations/my")
}