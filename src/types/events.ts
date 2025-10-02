import { User } from "./user";

export type Event = {
  _id: string;
  address: string;
  color: string;
  cover: number;
  date: string;
  details: string;
  link: string;
  time: string;
  title: string;
  user: User;
  venue: string;
};
