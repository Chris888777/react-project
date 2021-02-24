import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from '../../components/Navbar'
import {useDispatch, useSelector} from "react-redux";
import './Admin.css';
import * as actionTypes from "../../store/actions";

const Admin = () => {
    const [newProduct, setNewProduct] = useState({});
    const [editProduct, setEditProduct] = useState({});
    let history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const products = useSelector((state) => state.products.products);
    const firstName = useSelector((state) => {
        if (!state.auth.user) {
            history.push('/');
        } else {
            return state.auth.user.firstName
        }
    });

    useEffect(() => {
        createGraph();
    }, [products]);

    const addProduct = async () => {
        await axios.post("/api/products/add", newProduct, {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
    };

    const saveProduct = async () => {
        await axios.post("/api/products/update", {product: {...editProduct, id: editProduct._id}}, {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
    };
    const removeProduct = async (id) => {
        await axios.delete("/api/products/delete", {data: { id }, headers: { "Content-Type": "application/json", "Authorization": "Bearer "+ token},});
        dispatch({ type: actionTypes.UPDATE_PRODUCTS, value: products.filter(product => product._id !== id)});
    };
    const createGraph = () => {
        const ctx = document.getElementById('myChart');
        const labels = products.map((product) => product.name);
        const data = products.map((product) => product.price);
        const myChart = new window.Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    label: 'Prices',
                    data,
                    backgroundColor: products.map(() => {
                        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
                    }),
                }]
            }
        });
    };

    return (
        <div className="admin container">
            <div className='sticky'>
                <Navbar/>
            </div>
            <div className="row">
                <div className="col">
                    <h1>Admin page for {firstName}</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <form id="productForm">
                        <h3>Add product</h3>
                        <div className="form-row">
                            <label>Name:</label>
                            <input type="text" name="name" onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>
                        </div>
                        <div className="form-row">
                            <label>Price:</label>
                            <input type="number" name="price" onChange={e => setNewProduct({...newProduct, price: e.target.value})}/>
                            </div>
                        <div className="form-row">
                            <label>Picture:</label>
                            <input type="text" name="picture" onChange={e => setNewProduct({...newProduct, picture: e.target.value})}/>
                        </div>
                        <div className="form-row">
                            <input type="button" value="Add" onClick={addProduct}/>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th className="picture"><div className="col-header picture">Picture</div></th>
                                <th  className="name"><div className="col-header name">Name</div></th>
                                <th  className="price"><div className="col-header price">Price</div></th>
                                <th  className="save"></th>
                                <th  className="delete"></th>
                            </tr>
                        </thead>
                        <tbody>
                        { products.map((product) =>
                            <tr>
                                <td className="picture">
                                <div className="col-body picture">
                                    <input type="text" defaultValue={product.picture} onChange={e => setEditProduct({...product, ...editProduct, picture: e.target.value})}/>
                                    </div>
                                </td>
                                <td  className="name">
                                <div className="col-body name">
                                    <input type="text" defaultValue={product.name} onChange={e => setEditProduct({...product,...editProduct, name: e.target.value})}/>
                                    </div>
                                </td>
                                
                                <td  className="price">
                                <div className="col-body price">
                                    <input type="text" defaultValue={product.price} onChange={e => setEditProduct({...product, ...editProduct, price: e.target.value})}/>
                                    </div>
                                </td>
                                
                                <td  className="save">
                                    <a onClick={() => saveProduct(product._id)}>Save</a>
                                </td>
                                <td  className="delete">
                                    <a onClick={() => removeProduct(product._id)}>Delete</a>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <canvas id="myChart"/>
                </div>
            </div>
        </div>
    )
};

export default Admin;
