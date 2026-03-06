import EventList from "./components/EventList";
import { useState } from "react";

export default function App(){
    const [events, setEvents] = useState([
  {
    "_id": "640a1f1e8f1b2c0012345678",
    "title": "React Basics Workshop",
    "description": "Learn the fundamentals of React.js and build your first interactive UI.",
    "date": "2026-04-10T10:00:00.000Z",
    "location": "Tech Hub, San Francisco, CA"
  },
  {
    "_id": "640a1f1e8f1b2c0012345679",
    "title": "Node.js API Bootcamp",
    "description": "Hands-on workshop to build REST APIs using Node.js, Express, and MongoDB.",
    "date": "2026-04-15T14:00:00.000Z",
    "location": "Innovation Center, Austin, TX"
  },
  {
    "_id": "640a1f1e8f1b2c0012345680",
    "title": "Fullstack Hackathon",
    "description": "A 48-hour fullstack hackathon to build apps using React and Node.js.",
    "date": "2026-05-01T09:00:00.000Z",
    "location": "Startup Lab, New York, NY"
  }
])

return(
    <>
        <EventList events={events}/>
    </>
)
}