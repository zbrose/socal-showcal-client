import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navigate, Link } from "react-router-dom";

function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      //post to backend with form data to login
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        form
      );
      //decode the token that is sent to us
      const { token } = response.data;
      const decoded = jwt_decode(token);
      //save token in local storage
      localStorage.setItem("jwt", token);
      //set the app state to the logged in user
      setCurrentUser(decoded);
      console.log("successfully signed in as user:", decoded.username);
    } catch (err) {
      if (err.response.status === 400) {
        setMsg(err.response.data.msg);
      }
    }
  };

  //navigate to the user profile if user is not null
  if (currentUser) return <Navigate to="/" />;
  return (
    <div>
      <h1>Login: </h1>
      <p style={{ color: "red" }}>{msg ? msg : ""}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          required
          type="text"
          id="email"
          placeholder="user@domain.com"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          className={msg ? "invalid" : ""}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          className={msg ? "invalid" : ""}
        />

        <input type="submit" />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Login;
