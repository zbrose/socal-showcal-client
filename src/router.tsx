import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventForm from "./components/EventForm";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/:id" element={<EventForm />} />
    </Routes>
  );
};

export default Router;
