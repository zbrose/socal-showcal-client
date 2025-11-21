import { NavLink } from "react-router";
import { Enums } from "@/enums/enums";
import { EventType } from "@/types/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

interface EventFooterProps {
  event: EventType;
  confirmation: boolean;
  handleConfirmation: () => void;
  setConfirmation: (confirmation: boolean) => void;
  handleDelete: () => void;
}

const EventActions = ({
  event,
  confirmation,
  handleConfirmation,
  setConfirmation,
  handleDelete,
}: EventFooterProps) => {
  return (
    <div className="event-actions">
      <NavLink
        className="button button--ghost button--link"
        to={`/events/${event._id}`}
      >
        <FontAwesomeIcon icon={faEdit} />
      </NavLink>
      <button
        className="button button--ghost button--mono"
        onClick={handleConfirmation}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {confirmation && (
        <div className="confirmation-modal">
          <p>{Enums.LABELS.ASK}</p>

          <div className="button-group">
            <button
              className="button button--ghost button--small"
              onClick={() => setConfirmation(false)}
            >
              {Enums.LABELS.CANCEL}
            </button>
            <button
              className="button button--danger button--small"
              onClick={handleDelete}
            >
              {Enums.LABELS.DELETE}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventActions;
