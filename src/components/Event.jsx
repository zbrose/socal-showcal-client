import axios from 'axios'
import {Link} from 'react-router-dom'

function Event({event, setTrigger, currentUser}) {

//    console.log('EVENT INFO',event.user[0]._id)
//    console.log('USER', currentUser.id)

    const handleClick = () => {
        const token = localStorage.getItem('jwt')
        const config = {
            headers: { Authorization: `${token}` }
        };
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/events/${event._id}`, config )
        .then(res=>{
            setTrigger('deleted')
        })
        .catch(console.log)
    }

    const loggedIn = (
        <>
            <Link to={`/events/${event._id}`}>Edit Event</Link>
            <button onClick={handleClick}>Delete</button>
        </>
    )

    return (
        <div className="event-container">
            <div>
                <h1>{event.title}</h1>
                <h3>{event.date} at {event.time} </h3>
                <p>{event.address}, {event.city}, {event.state} {event.zipcode} </p>
                <p>${event.cover} cover</p>
                <p>For people who like: {event.genre}</p>
                <p>Details: {event.details}</p>
            </div>

         {event.user[0] && currentUser ? (event.user[0]._id===currentUser.id ? loggedIn : null) : null}

        </div>
    )
}

export default Event