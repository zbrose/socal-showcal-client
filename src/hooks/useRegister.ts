import { useUserStore } from "@/store/userStore";
import { RegisterForm } from "@/types/registerForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

type ErrorResponse = {
  msg: string;
};

export const useRegister = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation<
    AxiosResponse<any>,
    AxiosError<ErrorResponse>,
    RegisterForm
  >({
    mutationFn: async (formData: RegisterForm) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        formData
      );
    },
    onSuccess: (response) => {
      const token = response.data.token;
      if (!token) {
        throw new Error("There was an error creating a token");
      }
      localStorage.setItem("jwt", token);
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    },
  });
};
