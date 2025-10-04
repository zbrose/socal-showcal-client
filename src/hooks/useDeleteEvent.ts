import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-event"],
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `${token}` },
      };
      return await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/events/${id}`,
        config
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["getEvents"] });
    },
  });
};
