import axios from 'axios'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

function Event({event, setTrigger, currentUser}) {

  let dateTime = dayjs(event.date + event.time).format()
  let endDate = dayjs(event.date+(parseInt(event.time)+3)).format()

  const gapi = window.gapi
  const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events'
  
  const handleCalendarEvent = () => {
    gapi.load('client:auth2', ()=>{
      console.log('loaded client')
      gapi.client.init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          discoveryDocs: DISCOVERY_DOC,
          scope: SCOPES,
          plugin_name: 'chat'
      })
      gapi.client.load('calendar', 'v3', ()=> console.log('loaded'))

      gapi.auth2.getAuthInstance().signIn().then(()=>{
        const eventInfo = {
          'summary': `${event.title}`,
          'location': `${event.address}`,
          'description': `${event.details}, $${event.cover} cover, ${event.link}`,
          'start': {
            'dateTime': `${dateTime}`,
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': `${endDate}`,
            'timeZone': 'America/Los_Angeles'
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        const request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': eventInfo,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
      })
    })
  }

  
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
      <div className='logged-in'>
          <p>--------------------</p>
          <Link to={`/events/${event._id}`}>Edit Event</Link>
          <button onClick={handleClick}>Delete Event</button>
      </div>
  )
  
  return (
      <div className="event-container">
          <div>
              <h1>{event.title} @ {event.venue}</h1>
              <h3>{dayjs(`${event.date}${event.time}`).format('MMMM D, YYYY @ h:mma')}</h3>
              <h4><a href={event.link} target='_blank'>Tickets</a></h4>
              <a target='_blank' href={`http://www.google.com/maps/?q=${event.address !== '' ? event.address : event.otherAddress + event.city + event.state + event.zipcode}`}>{event.address ? event.address : `${event.otherAddress}, ${event.city}, ${event.state} ${event.zipcode} `}</a>
              <p>${event.cover} cover</p>
              {/* <p>For people who like: {event.genre}</p> */}
              <p>Details: {event.details}</p>
              <button onClick={handleCalendarEvent}>Add Event to Google Calendar</button>
              <p>Posted by: {event.user[0] && currentUser ? (event.user[0]._id===currentUser.id ?  'You': event.user[0].username) : event.user[0].username }</p>
          </div>

        {event.user[0] && currentUser ? (event.user[0]._id===currentUser.id ? loggedIn : null) : null}

      </div>
  )
}

export default Event
