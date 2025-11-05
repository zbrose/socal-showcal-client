import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventForm from "./components/EventForm";
import EventsPage from "./pages/Events";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/:id" element={<EventForm />} />
    </Routes>
  );
};

export default Router;
