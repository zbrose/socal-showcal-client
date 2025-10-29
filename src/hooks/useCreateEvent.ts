import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { Enums } from "@/enums/enums";
import { CreateForm } from "@/types/event";

export const useCreateEvent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-event"],
    mutationFn: async (formValues: CreateForm) => {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `${token}` },
      };
      return await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/events/new`,
        formValues,
        config
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["getEvents"] });
      navigate(Enums.ROUTES.HOME);
    },
  });
};
