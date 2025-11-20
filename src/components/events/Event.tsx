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
      <div className="event-header">
        <h2 className="event-title">
          {event.title} @{" "}
          {event.venue !== "Custom Address" ? event.venue : event.customVenue}
        </h2>
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
      <p>
        {dayjs(`${event.date}${event.time}`).format("MMMM D, YYYY @ h:mma")}
      </p>
      <a
        className="address-link"
        target="_blank"
        rel="noreferrer"
        href={`http://www.google.com/maps/?q=${event.address}`}
      >
        {event.address}
      </a>
      <p>{event.cover ? `$${event.cover} cover` : "Free"}</p>
      <p>{event.details && event.details}</p>
      <p>Posted by: {isCurrentUser ? "You" : event?.user[0]?.username}</p>

      {event.link && (
        <a
          className="address-link"
          href={event.link}
          target="_blank"
          rel="noreferrer"
        >
          Get Tickets
        </a>
      )}
    </div>
  );
};

export default Event;
