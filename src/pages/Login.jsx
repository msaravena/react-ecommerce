import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertError from '../components/AlertError';


const  Login = () => {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate()
    const [ alert, setAlert ] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }
        
        axios
        .post("https://ecommerce-api-v6d7.onrender.com/users/login", data)
        .then((resp) => {
            localStorage.setItem("token", resp.data)
            navigate("/")
           
          })
        .catch(error => {
            console.error(error)
            setAlert(true)
        })   
    }

const [ isLogged, setIsLogged ] = useState(localStorage.getItem("token"))

const logout = () => {

    localStorage.clear()
    setIsLogged(false)
}

    return (


        <div>

          {
            isLogged
            ?
            <Card style={{maxWidth: 500, margin: "3rem auto", padding:"2rem" }} className="logout-card">
                <i class='bx bx-user' ></i>
                <Button onClick={logout}>Logout</Button>
            </Card>
            :          
            <Card style={{maxWidth: 500, margin: "3rem auto", padding:"2rem" }}>
                <h1>Login</h1>
                <Form onSubmit={ (e) => {handleSubmit(e)} } >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
           
           }

            <AlertError
            isVisible={ alert }
            dismiss={ () => setAlert(false) }
            />
        </div>
       

    )

}

export default Login