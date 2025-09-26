import { useUserStore } from "@/store/userStore";
import { LoginForm } from "@/types/loginForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const useLogin = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation({
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
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        setCurrentUser(decoded);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    },
  });
};
