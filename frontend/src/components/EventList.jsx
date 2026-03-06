import {Link} from 'react-router-dom'
import EventCard from './EventCard'
import { useEvent } from '../context/EventContext'

export default function EventList({}){
    const {events, isLoading} = useEvent()

    if(isLoading){
        return <p>Loading</p>
    }
    if (!events || events.length === 0) return <p>No events available</p>;

    return(
        <div className="event">
            {events.map(ev => <Link key={ev._id} to={`/events/${ev._id}`}><EventCard  event={ev}/></Link>)}
        </div>
    )
}