export default function EventCard({event}){
    return(
        <div className="card">
            <p className="title">{event.title}</p>
            <p className="description">{event.description}</p>
            <p className="date">{event.date} {event.location}</p>
        </div>
    )
}