import Form from "../Form";

function NewEvent({setTrigger, currentUser}) {
    return ( 
        <div>
            <h3>Create an Event </h3>
            <Form setTrigger={setTrigger} currentUser={currentUser}/>
        </div>
    )
}

export default NewEvent