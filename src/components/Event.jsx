import axios from 'axios'
import {Link} from 'react-router-dom'

function Event({event, setTrigger}) {
    const handleClick = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/events/${event._id}`)
        .then(res=>{
            setTrigger('deleted')
        })
        .catch(console.log)
    }

    return (
        <div className="event-container">
            <div>
                <h1>{event.title}</h1>
                <h3>{event.date} || {event.time} </h3>
                <p>{event.address}, {event.city}, {event.state} {event.zipcode} </p>
                <p>${event.cover} cover</p>
                <p>For people who like: {event.genre}</p>
                <p>Details: {event.details}</p>
            </div>

            <Link to={`/events/${event._id}`}>Edit Event</Link>
          
            <button onClick={handleClick}>Delete</button>

        </div>
    )
}

export default Event