import { useUserStore } from "@/store/userStore";
import { Link, useNavigate, useLocation } from "react-router";
import { Enums } from "@/enums/routes";

const Navbar = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/");
  };

  const isRegister: boolean = location.pathname === Enums.ROUTES.REGISTER;

  return (
    <header>
      <Link to="/">
        <h1>SoCal Show Cal</h1>
      </Link>

      <nav>
        <Link to={Enums.ROUTES.HOME}>Events</Link>

        {!currentUser ? (
          <Link to={isRegister ? Enums.ROUTES.LOGIN : Enums.ROUTES.REGISTER}>
            {isRegister ? Enums.LABELS.LOGIN : Enums.LABELS.REGISTER}
          </Link>
        ) : (
          <>
            <Link to={Enums.ROUTES.NEW_EVENT ?? "/events/new"}>Add Event</Link>
            <button onClick={handleLogout} aria-label="Log out">
              Log out
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
