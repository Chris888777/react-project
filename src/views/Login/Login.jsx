import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import * as actionTypes from "../../store/actions";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState();
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (document.cookie) {
            dispatch({ type: actionTypes.LOGIN_SUCCESS, value: JSON.parse(document.cookie)});
            history.push('/welcome');
        }
    }, []);

    const login = async () => {
        try {
            const data = await axios.post("/api/users/login", {email, password, rememberme}, {headers: {"Content-Type": "application/json"}})
            if (data.data.token) {
                const token = data.data.token;
                const user = data.data.user;

                let expiration = new Date().getTime() + (86400000 * 180);
                if (rememberme) {
                    expiration = 'Fri, 31 Dec 9999 23:59:59 GMT';
                }
                if (new Date().getTime() >= user.nextPasswordChange) {
                    history.push('/changePassword');
                } else {
                    dispatch({ type: actionTypes.LOGIN_SUCCESS, value: {token, user}});
                    document.cookie = JSON.stringify({token, user}) + "; expires=" + new Date(expiration).toGMTString();
                    history.push('/welcome');
                }
            }
            if (data.data.changePassword) {
                history.push('/password');
            }
        } catch (error) {
            setError('Wrong email/password');
        }
    };

    return (
        <div className="login container">
            <div className="row">
                <div className="col">
                    <form id="loginForm">
                        <h1>Login</h1>
                        <p>
                            <label>Email:</label>
                            <input type="email" name="email" onChange={e => setEmail(e.target.value)}/>
                        </p>
                        <p>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                        </p>
                        <input type="checkbox" name="remember" onChange={e => setRememberme(e.target.checked)}/>
                        <label htmlFor="remember">Remember me</label>
                        <p>
                            <input type="button" value="Login" onClick={login}/>
                        </p>
                        <p className="error">{error}</p>
                        <Link to="/register">Register?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;
