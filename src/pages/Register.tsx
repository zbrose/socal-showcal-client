import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { RegisterForm } from "@/types/registerForm";
import { useRegister } from "@/hooks/useRegister";

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmation: "",
  });
  const [msg, setMsg] = useState("");
  const { mutate: registerUser, error } = useRegister();
  const navigate = useNavigate();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      setMsg(
        "Password must be at least 8 characters long and include at least one number and one special character."
      );
      return;
    }

    if (form.password !== form.confirmation) {
      setMsg("The passwords you entered do not match.");
      return;
    }

    registerUser(form, {
      onSuccess: () => {
        navigate("/");
      },
    });

    if (error) {
      setMsg(error?.response?.data.msg ?? "There was an error");
      setForm((prevForm) => ({
        ...prevForm,
        password: "",
        passwordConfirmation: "",
      }));
    }
  };

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

        <label htmlFor="confirmation">Confirmation:</label>
        <input
          required
          type="password"
          id="confirmation"
          placeholder="confirm password"
          onChange={(e) => setForm({ ...form, confirmation: e.target.value })}
          value={form.confirmation}
          className={msg ? "invalid" : ""}
        />

        <input type="submit" />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Register;
