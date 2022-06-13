import axios from 'axios'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

function Form({foundEvent, setTrigger}) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({...foundEvent})

    
    const handleSubmit = e => {
        e.preventDefault()
        if (!foundEvent){
            axios.post(`${process.env.REACT_APP_SERVER_URL}/events/new`, formData)
            .then(response=>{
                console.log(response.data)
                setTrigger('created')
                navigate('/events')
            })
            .catch(console.log)
            console.log('NEW EVENT CREATED')
        } else {
            axios.put(`${process.env.REACT_APP_SERVER_URL}/events/${foundEvent._id}/edit`, formData)
            .then(response=>{
                console.log(response.data)
                setTrigger('edited')
                navigate('/events')
            })
            .catch(console.log)
        }
    }

    return ( 

    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input type='text' id ='title'
            value={formData.title}
            onChange={e=>setFormData({...formData, title: e.target.value})}
            />

            <label htmlFor='date'>Date: </label>
            <input type='date' id ='date'
            value={formData.date}
            onChange={e=>setFormData({...formData, date: e.target.value})}
            />

            <label htmlFor='time'>Time: </label>
            <input type='time' id ='time'
            value={formData.time}
            onChange={e=>setFormData({...formData, time: e.target.value})}
            />

            <label htmlFor='address'>Address: </label>
            <input type='text' id ='address'
            value={formData.address}
            onChange={e=>setFormData({...formData, address: e.target.value})}
            />

            <label htmlFor='city'>City: </label>
            <input type='' id ='city'
            value={formData.city}
            onChange={e=>setFormData({...formData, city: e.target.value})}
            />

            <label htmlFor='zipcode'>Zip: </label>
            <input type='number' id ='zipcode'
            value={formData.zipcode}
            onChange={e=>setFormData({...formData, zipcode: e.target.value})}
            />

            <label htmlFor='cover'>Cover Charge: </label>
            <input type='number' id ='cover'
            value={formData.cover}
            onChange={e=>setFormData({...formData, cover: e.target.value})}
            />

            <label htmlFor='genre'>Genre: </label>
            <input type='text' id ='genre'
            value={formData.genre}
            onChange={e=>setFormData({...formData, genre: e.target.value})}
            />

            <label htmlFor='details'>Details: </label>
            <input type='text' id ='details'
            value={formData.details}
            onChange={e=>setFormData({...formData, details: e.target.value})}
            />

            <input type="submit" />
        </form>
        <Link to='/events'> Back </Link>
    </div>
     )
}

export default Form