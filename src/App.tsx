import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
// import ShowEvents from './components/ShowEvents'
import EditEvent from "./pages/EditEvent";
import NewEvent from "./pages/NewEvent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setCurrentUser(jwtDecode(token));
    } else setCurrentUser(null);
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/events")
      .then((response) => {
        const sortedEvents = response.data.sort(
          (a: { date: string }, b: { date: string }) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        console.log(sortedEvents);
        setEvents(sortedEvents);
        setIsLoading(false);
        setTrigger("");
      })
      .catch(console.log);
  }, [trigger]);

  const handleLogout = () => {
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  return (
    <div>
      <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoading={isLoading}
              events={events}
              setTrigger={setTrigger}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        {/* <Route  
          path='/events'
          element={<ShowEvents setTrigger={setTrigger} events={events}/>}
        /> */}
        <Route
          path="/events/new"
          element={
            <NewEvent setTrigger={setTrigger} currentUser={currentUser} />
          }
        />
        <Route
          path="/events/:id"
          element={
            <EditEvent
              events={events}
              setTrigger={setTrigger}
              currentUser={currentUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
