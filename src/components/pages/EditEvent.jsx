import {useParams} from "react-router-dom"
import Form from "../Form";


function EditEvent({events, setTrigger}) {
    const {id} = useParams()
    let foundEvent = events.find(event=>event._id===id)

    return ( 
        <div>
            <h3>Edit This Event</h3>
            <Form foundEvent={foundEvent} setTrigger={setTrigger}/>
        </div>
     );
}

export default EditEvent;