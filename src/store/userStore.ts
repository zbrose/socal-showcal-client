import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => {
  let decodedUser: User | null = null;

  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      decodedUser = jwtDecode<User>(token);
    } catch (err) {
      console.error("Invalid token in localStorage:", err);
      localStorage.removeItem("jwt");
    }
  }

  return {
    currentUser: decodedUser,
    setCurrentUser: (user: User | null) => set({ currentUser: user }),
  };
});
