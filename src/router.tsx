import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import { Routes, Route } from "react-router";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events/new" element={<NewEvent />} />
      <Route path="/events/:id" element={<EditEvent />} />
    </Routes>
  );
};

export default Router;
