import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import "./signin.css";
import logo from "./images/favicon_io/512x512.png";
import { variables } from './include/Variables';
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { setAuth } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const locale = 'EN';
    const date = new Date();
    const month = date.toLocaleDateString(locale, { month: 'short' });
    const year = date.getFullYear();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [username, password]);
    
    // const loginUser = async () =>  {
    //     const data = await fetch(variables.API_URL + 'user/token/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     return await data.json();
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username !== '' && password !== '') {
            try {
                const response = await axios.get(variables.API_URL + 'user/token/');
                console.log("Response Data:", response?.data);

                const token = response?.data?.token;
                setAuth({ token });

                setUsername('');
                setPassword('');

                navigate(from, {replace: true});
            }
            catch(error) {
                if(!error?.response) {
                    setErrorMsg("No Server Response");
                }
                else if(error.response?.status === 400) {
                    setErrorMsg("Missing username or password");
                }
                else if(error.response?.status === 401) {
                    setErrorMsg("Unauthorized");
                }
                else {
                    setErrorMsg("Login Failed");
                }
                errorRef.current.focus();
            }
            // loginUser().then(data => {
            //     sessionStorage.setItem('token', JSON.stringify(data['token']));
            //     window.location.href = "/"
            // })
        } else {
            console.log("Error, either username or password is incorrect");
        }
    }

    return (
        <main className="body">
            <div className="form-signin text-center">
                <form onSubmit={handleSubmit}>
                    <p ref={errorRef} aria-live="assertive">
                        {errorMsg}
                    </p>
                    <img className="mb-4" src={ logo } alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="name@example.com"
                            onChange={(e) => setUsername(e.target.value)} value={username} ref={userRef}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)} value={password}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; {month + " " + year }</p>
                </form>
            </div>
        </main>
    )
};

export default Login;
