import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Navigate, Link } from "react-router-dom";

function Register({ setCurrentUser, currentUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [msg, setMsg] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setMsg(
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
      return;
    }

    if (form.password !== form.passwordConfirmation) {
      setMsg("The passwords you entered do not match.");
      return;
    }

    try {
      const { passwordConfirmation, ...formData } = form;
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        formData
      );
      const { token } = response.data;
      const decoded = jwtDecode(token);

      localStorage.setItem("jwt", token);
      setCurrentUser(decoded);
      console.log(decoded);
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
      console.log(err);
      setForm((prevForm) => ({
        ...prevForm,
        password: "",
        passwordConfirmation: "",
      }));
    }
  };

  if (currentUser) return <Navigate to="/" />;
  return (
    <div>
      <h1>Register: </h1>
      <p style={{ color: "red" }}>{msg ? msg : ""}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">User Name:</label>
        <input
          required
          type="text"
          id="name"
          placeholder="name"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          value={form.username}
          className={msg ? "invalid" : ""}
        />

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          npm
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

        <label htmlFor="passwordConfirmation">Confirmation:</label>
        <input
          required
          type="password"
          id="password"
          placeholder="confirm password"
          onChange={(e) =>
            setForm({ ...form, passwordConfirmation: e.target.value })
          }
          value={form.passwordConfirmation}
          className={msg ? "invalid" : ""}
        />

        <input type="submit" />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Register;
