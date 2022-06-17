import {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

function Register({setCurrentUser, currentUser}) {
    const [form, setForm] = useState({
        username:'',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [msg, setMsg] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            if (form.password === form.passwordConfirmation){
                //remove unneeded data in the form
                delete form.passwordConfirmation
                //post to backend with form data to login
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, form)
                //decode the token that is sent to us
                const {token} = response.data 
                const decoded = jwt_decode(token)
                //save token in local storage
                localStorage.setItem('jwt', token)
                //set the app state to the logged in user
                setCurrentUser(decoded)
                console.log(decoded)
            } else {
                setMsg('the two passwords you enterd do not match')
            }
        } catch (err) {
            if(err.response.status===409){
                setMsg(err.response.data.message)
            }
            console.log(err)
        }
    }

    if(currentUser) return <Navigate to='/' />
    return ( 
        <div>

            <h1>Register: </h1>
            <p>{msg ? `entered info not valid ${msg}` :''}</p>
            <form onSubmit={handleFormSubmit}>

            <label htmlFor='name'>User Name:</label>
            <input type="text"
             id='name'
             placeholder='name'
             onChange={e => setForm({...form, username: e.target.value})}
             value={form.username}
            
            />

            <label htmlFor="email">Email:</label>
            <input type="email"
             id='email'npm 
             placeholder='user@domain.com'
             onChange={e => setForm({...form, email: e.target.value})}
             value={form.email}
            />

            <label htmlFor='password'>Password:</label>
            <input type="password"
             id='password'
             placeholder='password'
             onChange={e => setForm({...form, password: e.target.value})}
             value={form.password}
            />

            <label htmlFor='passwordConfirmation'>Confirmation:</label>
            <input type="password"
             id='password'
             placeholder='confirm password'
             onChange={e => setForm({...form, passwordConfirmation: e.target.value})}
             value={form.passwordConfirmation}
            />

            <input type="submit" />

        </form>
        </div>
     );
}

export default Register;