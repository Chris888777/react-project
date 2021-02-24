import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from '../../components/Navbar'

import './Welcome.css';
import axios from "axios";
import * as actionTypes from "../../store/actions";

const Welcome = () => {
    const [currentPage, setCurrentPage] = useState(1);

    let history = useHistory();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const firstName = useSelector((state) => {
        if (!state.auth.user) {
            history.push('/');
        } else {
            return state.auth.user.firstName
        }
    });
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        if (token.length) {
            loadProducts();
        }
    }, [token]);

    const loadProducts = async () => {
        try {
            const data = await axios.get("/api/products/", {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
            dispatch({ type: actionTypes.UPDATE_PRODUCTS, value: data.data.products});
        } catch (e) {
            console.log('error loading products', e.message);
        }
    };

    const addCart = async (id) => {
        try {
            await axios.post("/api/cart", { id, user_id: user.id }, {headers: {"Content-Type": "application/json", "Authorization": "Bearer "+ token}});
        } catch (e) {
            console.log('error adding product', e.message);
        }
    };
    
const recordsPerPage = 4;


const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
}

const nextPage = () => {
    if (currentPage < numPages()) {
        setCurrentPage(currentPage + 1);
    
    }
}
    
const changePage = () => {
    return products.map((product , i) => {
        if (i >= ((currentPage-1) * recordsPerPage) && i < (currentPage * recordsPerPage)) {
            return ( <tr key={product._id}>
                <td><div className="center-col"><img src={product.picture} /></div></td>
                <td><div className="center-col">{product.name}</div></td>
                <td><div className="center-col">{product.price}</div></td>
                <td>
                <div className="center-col">
                    <button onClick={() => addCart(product._id)}>&#10004;</button> 
                </div>
                </td>
            </tr>) 
            }
     }
    )
}

const pageNumber = () => {
    let pagesButtens = [];
    for (let i = 0; i < numPages(); i++) {
        pagesButtens.push((<button disabled={i === currentPage - 1} onClick={()=> {setCurrentPage(i+1)}} className={`page-button ${i === currentPage - 1 ? 'currnet-page' : ''}`}>{i + 1}</button>))
    }
return pagesButtens

    // return products.map((product , i) => {
    //     if (i >= ((currentPage-1) * recordsPerPage) && i < (currentPage * recordsPerPage)) {
    //         return ( <button></button>) 
    //         }
    //  }
    // )
}

const numPages = () => {
    return Math.ceil(products.length / recordsPerPage);
}

    return (
        <div className="welcome container">
            <div className='sticky'>
                <Navbar/>
            </div>
            
            <div className="row">
                <div className="col">
                    <h1>Welcome, {firstName}</h1>
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
                                <th></th> 
                            </tr>
                        </thead>  
                        <tbody>
                        {changePage()}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button onClick={prevPage}>&#8810;</button>
                        <div className="page-buttons">
                            {pageNumber()}
                        </div>
                        <button  onClick={nextPage}>&#8811;</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Welcome;
