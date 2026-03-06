import {Link} from 'react-router-dom'
import EventCard from './EventCard'

export default function EventList({events}){

    return(
        <div className="event">
            {events.map(ev => <Link key={ev.id} to={`/events/${ev.id}`}><EventCard  event={ev}/></Link>)}
        </div>
    )
}