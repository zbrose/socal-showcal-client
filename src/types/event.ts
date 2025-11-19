import { User } from "./user";

export type EventType = {
  _id: number;
  title?: string;
  venue?: string;
  customVenue?: string;
  address?: string;
  date?: string;
  time?: string;
  cover?: string;
  link?: string;
  details?: string;
  color?: string;
  user: User[];
};

export type CreateForm = Omit<EventType, "_id" | "user">;
