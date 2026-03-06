import EventList from "./components/EventList";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App(){


return(
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/> 
          <Route path="/events" element={<EventList />}/>
        </Routes>
    </>
)
}