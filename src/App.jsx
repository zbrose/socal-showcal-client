import axios from 'axios'
import {Routes, Route, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import ShowEvents from './components/ShowEvents';
import EditEvent from './components/pages/EditEvent';
import NewEvent from './components/pages/NewEvent';

function App() {
  const [events, setEvents] = useState([])
  const [trigger, setTrigger] = useState('')

  useEffect(()=>{
    axios.get(process.env.REACT_APP_SERVER_URL + '/events')
    .then(response=>{
      setEvents(response.data)
      // console.log('re-render')
    })
    .catch(console.log)
  },[trigger])
  

  return (
    <div>
      <header>
        <h1>Show Biz</h1>
        <Link className='create-link' to={'/events/new'}>Create an event</Link>
      </header>

      <Routes>
        <Route  
          path='/events'
          element={<ShowEvents setTrigger={setTrigger} events={events}/>}
        />
        <Route  
          path='/events/new'
          element={<NewEvent setTrigger={setTrigger}/>}
        />
        <Route  
          path='/events/:id'
          element={<EditEvent events={events} setTrigger={setTrigger}/>}
        />
      </Routes>
    </div>
  )
}

export default App
