import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["getEvents"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const response = await api.get("/events");
      return response.data;
    },
  });
};
