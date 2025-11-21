import dayjs from "dayjs";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useDeleteEvent } from "@/hooks/useDeleteEvent";
import { EventType } from "@/types/event";
import EventActions from "./EventActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTicket } from "@fortawesome/free-solid-svg-icons";

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
          {event.title} -{" "}
          {event.venue !== "Custom Address" ? event.venue : event.customVenue}
        </h2>
        {isCurrentUser && (
          <EventActions
            event={event}
            confirmation={confirmation}
            handleConfirmation={handleConfirmation}
            setConfirmation={setConfirmation}
            handleDelete={handleDelete}
          />
        )}
      </div>

      <div className="">
        <a
          className="address-link"
          target="_blank"
          rel="noreferrer"
          href={`http://www.google.com/maps/?q=${event.address}`}
        >
          Location <FontAwesomeIcon icon={faLocationDot} />
        </a>
        <span> | </span>
        {event.link && (
          <a
            className="address-link"
            href={event.link}
            target="_blank"
            rel="noreferrer"
          >
            Tickets <FontAwesomeIcon icon={faTicket} />
          </a>
        )}
      </div>

      <p>
        {dayjs(`${event.date}${event.time}`).format("MMMM D, YYYY @ h:mma")}
      </p>
      <p>{event.cover ? `$${event.cover} cover` : "Free"}</p>
      <p>{event.details && event.details}</p>

      <p>Posted by: {isCurrentUser ? "You" : event?.user[0]?.username}</p>
    </div>
  );
};

export default Event;
