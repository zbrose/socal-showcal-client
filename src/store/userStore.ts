import { create } from "zustand";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface UserStore {
  currentUser: JwtPayload | null;
  setCurrentUser: (user: JwtPayload | null) => void;
}

export const useUserStore = create<UserStore>((set) => {
  let decodedUser: JwtPayload | null = null;

  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      decodedUser = jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error("Invalid token in localStorage:", err);
      localStorage.removeItem("jwt");
    }
  }

  return {
    currentUser: decodedUser,
    setCurrentUser: (user: JwtPayload | null) => set({ currentUser: user }),
  };
});
