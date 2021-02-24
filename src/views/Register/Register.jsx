import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as actionTypes from "../../store/actions";
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('light');
    const [error, setError] = useState();
    let history = useHistory();
    const dispatch = useDispatch();

    const register = async () => {
        try {
            const data = await axios.post("/api/users/register", {firstName, lastName, email, password, view}, {headers: {"Content-Type": "application/json"}});
            if (data.data.token) {
                const token = data.data.token;
                const user = data.data.user;
                dispatch({ type: actionTypes.REGISTER_SUCCESS, value: {token, user}});
                document.cookie = JSON.stringify({token, user}) + "; expires=" + new Date(new Date().getTime() + (86400000 * 180)).toGMTString();
                history.push('/welcome');
            }
        } catch (error) {
            setError('Wrong email/password');
        }
    };

    return (
        <div className="register container">
            <div className="row">
                <div className="col">
                    <form id="registerForm">
                        <h1>Register</h1>
                        <p>
                            <label>First name:</label>
                            <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)}/>
                        </p>
                        <p>
                            <label>Last name:</label>
                            <input type="text" name="lastName" onChange={e => setLastName(e.target.value)}/>
                        </p>
                        <p>
                            <label>Email:</label>
                            <input type="text" name="email" onChange={e => setEmail(e.target.value)}/>
                        </p>
                        <p>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                        </p>
                        <h6>Password must contain digits, uppercase and lowercase letters, and between 4 to 10 characters long</h6>
                        <p>
                            <label>View:</label>
                            <select name="view" onChange={e => setView(e.target.value)}>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </p>
                        <p>
                            <input type="button" value="Register" onClick={register}/>
                        </p>
                        <p className="error">{error}</p>
                        <Link to="/login">Login?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;
