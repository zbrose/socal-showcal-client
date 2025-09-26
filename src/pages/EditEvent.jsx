import { useParams } from "react-router";
import Form from "../components/Form";

function EditEvent({ events, setTrigger, currentUser }) {
  const { id } = useParams();
  let foundEvent = events.find((event) => event._id === id);

  return (
    <div>
      <h3>Edit This Event</h3>
      <Form
        foundEvent={foundEvent}
        setTrigger={setTrigger}
        currentUser={currentUser}
      />
    </div>
  );
}

export default EditEvent;
