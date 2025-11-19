import BasicInput from "@/components/inputs/BasicInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useLogin } from "@/hooks/useLogin";
import { LoginForm } from "@/types/loginForm";
import { DevTool } from "@hookform/devtools";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const methods = useForm<LoginForm>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isError, error, isPending } = useLogin();

  const onLogin = (data: LoginForm) => {
    console.log(data);
    login(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <h1>Login: </h1>
      {isError && (
        <p style={{ color: "red" }}>
          {error?.response?.data.msg ?? "Login failed. Please try again."}
        </p>
      )}
      <form onSubmit={methods.handleSubmit(onLogin)}>
        <BasicInput
          type="text"
          name="email"
          label="email:"
          required={true}
          placeholder="user@domain.com"
          disabled={isPending}
        />
        <PasswordInput
          label="password:"
          name="password"
          required={true}
          placeholder="password"
          disabled={isPending}
        />

        <div className="flex-row">
          <input
            className="button"
            type="submit"
            value={isPending ? "Logging in..." : "Login"}
          />
          <NavLink className="nav-link" to="/">
            Cancel
          </NavLink>
        </div>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Login;
