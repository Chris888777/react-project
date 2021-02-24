import React from "react";
import {Link,useHistory} from "react-router-dom";
import * as actionTypes from "../store/actions";
import {useDispatch, useSelector} from "react-redux";

import './Navbar.css';

export default () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const user = useSelector((state) => state.auth.user);

    const logout = () => {
        document.cookie = "''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.body.classList.remove(user.view);
        dispatch({ type: actionTypes.LOGOUT });
        history.push('/');
    };

    const showAdmin = () => {
        if (user && user.isAdmin) {
            return <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
            </li>;
        }
    };

    return (
        <nav className="navbar navbar-light bg-light navbar-expand-md">
            <Link className="navbar-brand" to="/">My Store</Link>
            <button className="navbar-toggler  navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/welcome">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    { showAdmin() }
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout}>Logout</a>
                    </li>
                </ul>
            </div>
            <div className="colors-line" />
        </nav>
    );
}
