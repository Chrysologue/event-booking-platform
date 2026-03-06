import { useParams } from "react-router-dom"
import { useEvent } from '../context/EventContext'

export default function EventDetail() {
    const { id } = useParams()
    const {events} = useEvent()
    const event = events.find(ev => ev._id === id)
    if (!event) return <p>Event not found</p>
    return (
        <div className="event">
            <p className="title">{event.title}</p>
            <p className="description">{event.description}</p>
            <p className="date">{event.date} {event.location}</p>
            <div className="btn">
                <button>Register</button>
                <button>Cancell</button>
            </div>
        </div>
    )
}