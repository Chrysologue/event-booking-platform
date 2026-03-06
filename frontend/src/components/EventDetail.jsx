import { useParams } from "react-router-dom"

export default function EventDetail({ events }) {
    const { id } = useParams()
    const event = events.find(ev => ev.id == id)
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