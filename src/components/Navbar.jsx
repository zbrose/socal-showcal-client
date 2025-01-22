import { Link } from "react-router-dom";

function Navbar({ handleLogout, currentUser }) {
  const loggedIn = (
    <>
      <Link to={"/events/new"}>Add Event</Link>
      <Link to="/">
        <span onClick={handleLogout}>Log out</span>
      </Link>
      {/* {{ currentUser } ? <p> Logged In: {currentUser.username} </p> : ""} */}
    </>
  );

  const loggedOut = (
    <>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
  return (
    <header>
      <h1>SoCal Show Cal</h1>
      {currentUser ? loggedIn : loggedOut}
    </header>
  );
}

export default Navbar;
