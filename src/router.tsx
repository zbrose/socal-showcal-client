import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/new" element={<NewEvent />} />
      <Route path="/events/:id" element={<EditEvent />} />
    </Routes>
  );
};

export default Router;
