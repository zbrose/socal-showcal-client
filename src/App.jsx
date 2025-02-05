import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import ShowEvents from './components/ShowEvents'
import EditEvent from "./components/pages/EditEvent";
import NewEvent from "./components/pages/NewEvent";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setCurrentUser(jwt_decode(token));
    } else setCurrentUser(null);
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "/events")
      .then((response) => {
        setEvents(response.data);
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
