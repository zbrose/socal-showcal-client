import Form from "../Form";

function NewEvent({setTrigger, currentUser}) {
    return ( 
        <div>
            <Form setTrigger={setTrigger} currentUser={currentUser}/>
        </div>
    )
}

export default NewEvent