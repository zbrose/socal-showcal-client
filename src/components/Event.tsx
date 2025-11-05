import dayjs from "dayjs";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useDeleteEvent } from "@/hooks/useDeleteEvent";
import EventFooter from "./EventFooter";
import { EventType } from "@/types/event";

interface EventProps {
  event: EventType;
}

const Event = ({ event }: EventProps) => {
  const [confirmation, setConfirmation] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);
  const { mutate: deleteEvent } = useDeleteEvent();

  const isCurrentUser = currentUser && event?.user[0]?._id === currentUser?.id;

  const handleConfirmation = () => {
    setConfirmation(true);
  };

  const handleDelete = () => {
    deleteEvent(event?._id);
  };

  return (
    <div className="event" style={{ backgroundColor: `${event.color}` }}>
      <div className="event-content">
        <h1>
          {event.title} @{" "}
          {event.venue !== "Other" ? event.venue : event.customVenueName}
        </h1>
        <h3>
          {dayjs(`${event.date}${event.time}`).format("MMMM D, YYYY @ h:mma")}
        </h3>
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://www.google.com/maps/?q=${
            event.address !== ""
              ? event.address
              : event?.otherAddress + event?.city + event.state + event.zipcode
          }`}
        >
          {event.address
            ? event.address
            : `${event.otherAddress}, ${event.city}, ${event.state} ${event.zipcode} `}
        </a>
        <p>{event.cover ? `$${event.cover} cover` : "Free"}</p>
        <p>{event.details && event.details}</p>
        <p>Posted by: {isCurrentUser ? "You" : event?.user[0]?.username}</p>

        {event.link && (
          <a href={event.link} target="_blank" rel="noreferrer">
            Get Tickets
          </a>
        )}
      </div>

      {isCurrentUser && (
        <EventFooter
          event={event}
          confirmation={confirmation}
          handleConfirmation={handleConfirmation}
          setConfirmation={setConfirmation}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Event;
