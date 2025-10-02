import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/events`
      );
      return response.data;
    },
  });
};
