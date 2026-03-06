import { createContext, useContext, useEffect, useState } from "react";
import {getAllEvents} from '../api/events'

const EventContext = createContext()

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getEvent = async() => {
            try{
                const data = await getAllEvents()
                setEvents(data.events)
                setIsLoading(false)
            }catch(err){
                setEvents(null)
            }finally{
                setIsLoading(false)
            }
        }
        getEvent()
    }, [])

    return(
        <EventContext.Provider value={{events, setEvents, isLoading}}>
            {children}
        </EventContext.Provider>
    )
}

export const useEvent = () => {
    return useContext(EventContext)
}