import { NavLink, useNavigate } from "react-router";
import { RegisterForm } from "@/types/registerForm";
import { useRegister } from "@/hooks/useRegister";
import { FormProvider, useForm } from "react-hook-form";
import BasicInput from "@/components/inputs/BasicInput";
import { DevTool } from "@hookform/devtools";
import PasswordInput from "@/components/inputs/PasswordInput";

const Register = () => {
  const { mutate: registerUser, isPending, error } = useRegister();
  const navigate = useNavigate();
  const methods = useForm<RegisterForm>({
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    registerUser(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  console.log(error);

  return (
    <FormProvider {...methods}>
      <h1>Register: </h1>
      {error && (
        <p className="error">
          {error.response?.data?.message ??
            "An error occurred.  Please try again later."}
        </p>
      )}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <BasicInput
          required={true}
          type="text"
          name="username"
          label="username:"
          placeholder="username"
          disabled={isPending}
        />

        <BasicInput
          required={true}
          type="email"
          name="email"
          label="email:"
          placeholder="user@email.com"
          disabled={isPending}
        />

        <PasswordInput
          required={true}
          name="password"
          label="password:"
          placeholder="password"
          disabled={isPending}
        />

        <PasswordInput
          required={true}
          name="confirmation"
          label="confirm password:"
          placeholder="confirm password"
          disabled={isPending}
        />
        <div className="flex-row">
          <input
            className="button"
            type="submit"
            value={isPending ? "Registering..." : "Register"}
          />
          <NavLink className="nav-link" to="/">
            Cancel
          </NavLink>
        </div>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default Register;
