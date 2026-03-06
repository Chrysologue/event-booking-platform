import { Link } from "react-router-dom";

export default function NavBar(){

    return(
        <nav className="nav-menu">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}