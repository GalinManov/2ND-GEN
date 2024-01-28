import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/useAuthContext';


export const Login = () => {

    const { dispatch } = useAuthContext();

    const nav = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");


    async function login(e) {
        e.preventDefault();

        const username = credentials.username;
        const email = credentials.email;
        const password = credentials.password;

        if (username == "" || email == "" || password == "") {
            alert("Please fill out all fields!");
            return;
        };

        try {
            const result = await axios.post('http://localhost:3001/users/login', { username, email, password });
            if (result.data.userID) {
                window.localStorage.setItem("userID", result.data.userID);
                dispatch({type: "LOGIN", payload: result.data.userID})
                nav("/");
            } else {
                setError(result.data.err);
            };

        } catch (err) {
            console.log(err)
        };
    };

    function onChange(e) {
        const value = e.target.value;

        setCredentials({
            ...credentials,
            [e.target.name]: value
        });

        console.log(credentials)
    };

    return (
        <div className='register-container'>
            <div className='form-box'>
                <h1>Please log into your account</h1>
                <Form style={{ "width": "600px" }} onSubmit={login}>
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

                    {error != "" &&
                        <p style={{ "color": "red" }}>
                            {error}
                        </p>
                    }

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div style={{ "marginTop": "25px" }}>Dont have an account? <a href='/register'>Click here to register!</a></div>
            </div>

        </div>
    )
}