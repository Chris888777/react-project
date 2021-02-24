import React, { useEffect } from "react";
import {useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { setBaseUrl } from "./config/axios";
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Welcome from './views/Welcome/Welcome';
import Cart from './views/Cart/Cart';
import Admin from './views/Admin/Admin';
import Password from './views/Password/Password';
import Footer from './components/Footer';

import "./App.css";



const App = () => {
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        setBaseUrl();
    }, []);

    useEffect(() => {
        if (user !== null) {
            document.body.classList.add(user.view);
        }
    }, [user]);

    return <Router>
        <Switch>
            <Route path="/welcome">
                <Welcome />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
            <Route path="/cart">
                <Cart />
            </Route>
            <Route path="/password">
                <Password />
            </Route>
            <Route path="/">
                <Redirect to="/login" />
            </Route>
        </Switch>
        <Footer/>
    </Router>;
};

export default App;
