import React, {useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from "../../store/actions";
import Navbar from '../../components/Navbar';
import './Cart.css';

const Cart = () => {
    const [total, setTotal] = useState(0);
    let history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const firstName = useSelector((state) => {
        if (!state.auth.user) {
            history.push('/');
        } else {
            return state.auth.user.firstName
        }
    });
    const cart = useSelector((state) => {
        return state.cart.cart;
    });

    useEffect(() => {
        if (token.length) {
            loadCart();
        }
    }, [token]);

    useEffect(() => {
        let cartTotal = 0;
        cart.forEach((product) => {
            cartTotal += product.price;
        });
        setTotal(cartTotal);
    }, [cart]);

    const loadCart = async () => {
        try {
            const data = await axios.get("/api/cart", {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
            const cart = data.data.success ? data.data.cart: [];
            dispatch({ type: actionTypes.UPDATE_CART, value: cart});
        } catch (e) {
            console.log('error loading cart', e.message);
        }
    };

    const remove = async (id) => {
        try {
            await axios.delete("/api/cart", { data: { id }, headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token} });
            dispatch({ type: actionTypes.UPDATE_CART, value: cart.filter(product => product._id !== id)});
        } catch (e) {
            console.log('error removing product', e.message);
        }
    };

    return (
        <div className="cart container">
            <div className="sticky">
                <Navbar/>
            </div>
            
            <div className="row">
                <div className="col">
                    <h1>{firstName}'s cart</h1> ({total}$)
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <table>
                        <thead>
                            <tr>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        { cart.map((product) =>
                            <tr key={product._id}>
                                <td><img src={product.picture} /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => remove(product._id)}>&#10006;</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Cart;
