import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Enums } from "@/enums/enums";

export const useEditEvent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-event"],
    mutationFn: async (formValues: any) => {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `${token}` },
      };
      return await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/events/${params.id}/edit`,
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
