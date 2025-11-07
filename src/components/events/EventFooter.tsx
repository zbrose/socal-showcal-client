import { Link } from "react-router";
import { Enums } from "@/enums/enums";
import { EventType } from "@/types/event";

interface EventFooterProps {
  event: EventType;
  confirmation: boolean;
  handleConfirmation: () => void;
  setConfirmation: (confirmation: boolean) => void;
  handleDelete: () => void;
}

const EventFooter = ({
  event,
  confirmation,
  handleConfirmation,
  setConfirmation,
  handleDelete,
}: EventFooterProps) => {
  return (
    <div className="logged-in">
      <hr />
      <Link to={`/events/${event._id}`}>Edit Event</Link>
      {!confirmation ? (
        <button onClick={handleConfirmation}>Delete Event</button>
      ) : (
        <div className="alert">
          <p>{Enums.LABELS.ASK}</p>
          <button
            style={{ backgroundColor: "lightgreen" }}
            onClick={() => setConfirmation(false)}
          >
            {Enums.LABELS.CANCEL}
          </button>
          <button style={{ backgroundColor: "red" }} onClick={handleDelete}>
            {Enums.LABELS.DELETE}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFooter;
