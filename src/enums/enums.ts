export const Enums = {
  ROUTES: {
    HOME: "/",
    REGISTER: "/register",
    EVENTS: "/events",
    NEW_EVENT: "/events/new",
    LOGIN: "/login",
  },
  STORAGE: {
    JWT: "jwt",
  },
  LABELS: {
    TITLE: "SoCal Show Cal",
    EVENTS: "Events",
    REGISTER: "Register",
    ADD_EVENT: "Add Event",
    LOGOUT: "Log out",
    LOGIN: "Log In",
    LOADING: "Loading.  Please Wait...",
    NO_EVENTS: "No upcoming events were found.",
  },
} as const;
