import { useLogin } from "@/hooks/useLogin";
import { LoginForm } from "@/types/loginForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate, isError, error, isPending } = useLogin();

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    mutate(form, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const handleOnChange = (e: any, field: any) => {
    const input = e.target.value;
    setForm({ ...form, [field]: input });
  };

  return (
    <div>
      <h1>Login: </h1>
      {isError && (
        <p style={{ color: "red" }}>
          {error?.response?.data.msg ?? "Login failed. Please try again."}
        </p>
      )}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          required
          type="text"
          id="email"
          placeholder="user@domain.com"
          onChange={(e) => handleOnChange(e, "email")}
          value={form.email}
          disabled={isPending}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => handleOnChange(e, "password")}
          value={form.password}
          disabled={isPending}
        />
        <input type="submit" value={isPending ? "Logging in..." : "Login"} />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Login;
