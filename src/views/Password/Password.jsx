import React, {useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import * as actionTypes from "../../store/actions";
import './Password.css';

const Password = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState();
    let history = useHistory();
    const dispatch = useDispatch();

    const changePassword = async () => {
        try {
            const token = JSON.parse(document.cookie).token;
            await axios.post("/api/users/password", {email, oldPassword, newPassword}, {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
            document.cookie = "''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            dispatch({ type: actionTypes.LOGOUT });
            history.push('/');
        } catch (error) {
            setError('Password change failed');
        }
    };

    return (
        <div className="password container">
            <div className="row">
                <div className="col">
                    <form id="passwordForm">
                        <h1>Change password</h1>
                        <p>
                            <label>Email:</label>
                            <input type="email" name="email" onChange={e => setEmail(e.target.value)}/>
                        </p>
                        <p>
                            <label>Current password:</label>
                            <input type="password" onChange={e => setOldPassword(e.target.value)}/>
                        </p>
                        <p>
                            <label>New password:</label>
                            <input type="password" onChange={e => setNewPassword(e.target.value)}/>
                        </p>
                        <p>
                            <input type="button" value="Submit" onClick={changePassword}/>
                        </p>
                        <p className="error">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Password;
