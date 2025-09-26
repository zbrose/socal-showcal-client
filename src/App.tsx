import axios from "axios";

import { useState, useEffect } from "react";
import EditEvent from "./pages/EditEvent";
import NewEvent from "./pages/NewEvent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";
import Router from "./router";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [trigger, setTrigger] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setCurrentUser(jwtDecode(token));
    } else setCurrentUser(null);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_SERVER_URL + "/events")
  //     .then((response) => {
  //       const sortedEvents = response.data.sort(
  //         (a: { date: string }, b: { date: string }) =>
  //           new Date(a.date).getTime() - new Date(b.date).getTime()
  //       );
  //       console.log(sortedEvents);
  //       setEvents(sortedEvents);
  //       setIsLoading(false);
  //       setTrigger("");
  //     })
  //     .catch(console.log);
  // }, [trigger]);

  const handleLogout = () => {
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
