import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventInput from "./pages/EventInput";
import EventsPage from "./pages/Events";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/new" element={<EventInput />} />
      <Route path="/events/:id" element={<EventInput />} />
    </Routes>
  );
};

export default Router;
