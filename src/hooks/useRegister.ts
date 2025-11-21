import { useUserStore } from "@/store/userStore";
import { RegisterForm } from "@/types/registerForm";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";

export const useRegister = () => {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation<AxiosResponse<any>, AxiosError<any>, RegisterForm>({
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
        const decoded = jwtDecode<User>(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
      }
    },
  });
};
