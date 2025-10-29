import FormField from "@/components/FormField";
import { useLogin } from "@/hooks/useLogin";
import { LoginForm } from "@/types/loginForm";
import { DevTool } from "@hookform/devtools";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

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
        <FormField
          type="text"
          name="email"
          label="Email:"
          required={true}
          placeholder="user@domain.com"
          disabled={isPending}
        />
        <FormField
          type="password"
          name="password"
          label="Password:"
          required={true}
          placeholder="password"
          disabled={isPending}
        />

        <input type="submit" value={isPending ? "Logging in..." : "Login"} />
      </form>
      <Link to="/">Back</Link>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default Login;
