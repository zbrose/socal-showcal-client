import { useUserStore } from "@/store/userStore";
import { NavLink, useNavigate } from "react-router";
import { Enums } from "@/enums/enums";

const Navbar = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <header>
      <h1 className="title">SoCal Show Cal</h1>

      <NavLink to={Enums.ROUTES.HOME}>Events</NavLink>

      {currentUser ? (
        <>
          <NavLink to={Enums.ROUTES.NEW_EVENT}>Add New Event</NavLink>
          <button
            className="log-out-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log out, {currentUser.username}
          </button>
        </>
      ) : (
        <>
          <NavLink to={Enums.ROUTES.REGISTER}>{Enums.LABELS.REGISTER}</NavLink>
          <NavLink to={Enums.ROUTES.LOGIN}>{Enums.LABELS.LOGIN}</NavLink>
        </>
      )}
    </header>
  );
};

export default Navbar;
