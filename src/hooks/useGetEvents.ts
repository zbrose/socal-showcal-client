import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["getEvents"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/events`
      );
      return response.data;
    },
  });
};
