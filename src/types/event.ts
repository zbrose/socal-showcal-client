import { User } from "./user";

export type EventType = {
  _id: number;
  address?: string;
  color?: string;
  cover?: string;
  date?: string;
  details?: string;
  link?: string;
  time?: string;
  title?: string;
  user: User[];
  venue?: string;
  customVenueName?: string;
  otherAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
};

export type CreateForm = Omit<EventType, "_id" | "user">;
