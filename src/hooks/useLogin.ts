import { useUserStore } from "@/store/userStore";
import { LoginForm } from "@/types/loginForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

type ErrorResponse = {
  msg: string;
};

export const useLogin = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation<AxiosResponse<any>, AxiosError<ErrorResponse>, LoginForm>({
    mutationFn: async (credentials: LoginForm) => {
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/login`,
        credentials
      );
    },
    onSuccess: (response) => {
      const token = response.data.token;
      if (!token) {
        throw new Error("There was an error creating a token");
      }
      localStorage.setItem("jwt", token);
      try {
        const decoded = jwtDecode<{
          id: string;
          username: string;
          email: string;
        }>(token);

        setCurrentUser({
          _id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        });
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    },
  });
};
