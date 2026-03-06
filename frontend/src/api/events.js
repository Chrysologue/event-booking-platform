import { makeHttpRequest } from "./api";

export async function getAllEvents() {
    return await makeHttpRequest("/events")
}

export async function createEvent(eventData) {
    return await makeHttpRequest("/events", "POST", eventData)
}

export async function updateEvent(id, updatedEvent){
    return await makeHttpRequest(`/events/${id}`, 'PUT',updatedEvent)
}

export async function deleteEvent(id){
    return await makeHttpRequest(`/events/${id}`, 'DELETE')
}