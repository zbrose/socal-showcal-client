import { useUserStore } from "@/store/userStore";
import { Link, useNavigate } from "react-router";
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
      <Link to="/">
        <h1>SoCal Show Cal</h1>
      </Link>

      <Link to={Enums.ROUTES.HOME}>Events</Link>

      {currentUser ? (
        <>
          <Link to={Enums.ROUTES.NEW_EVENT}>Add New Event</Link>
          <button
            className="log-out-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to={Enums.ROUTES.REGISTER}>{Enums.LABELS.REGISTER}</Link>
          <Link to={Enums.ROUTES.LOGIN}>{Enums.LABELS.LOGIN}</Link>
        </>
      )}
    </header>
  );
};

export default Navbar;
