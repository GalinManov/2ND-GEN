import '../css/register.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Register = () => {

    const nav = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });


    async function register(e) {
        e.preventDefault();

        const username = user.username;
        const email = user.email;
        const password = user.password;

        if(username == "" || email=="" || password ==""){
            alert("Please fill out all fields!");
            return;
        };

        try {
            await axios.post('http://localhost:3001/users/register', { username, email, password });
            nav("/login");

        } catch (err) {
            console.log(err)
        };


    };


    function onChange(e) {
        const value = e.target.value;

        setUser({
            ...user,
            [e.target.name]: value
        });

        console.log(user)
    };



    return (
        <div className='register-container'>
            <div className='form-box'>
                <h1>Please Create an account</h1>
                <Form style={{ "width": "600px" }} onSubmit={register}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' type="text" placeholder="Username" onChange={onChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={onChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type="password" placeholder="Password" onChange={onChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div style={{ "marginTop": "25px" }}>Already have an account? <a href='/login'>Click here to log in!</a></div>
            </div>
        </div>
    )
};