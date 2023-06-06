import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPolicies } from "./store/customer/customerSlice";
import { fetchPolicies, showPurchase} from "../functions/handlers";
import { clearCart} from "./store/cart/cartSlice";
import { useNavigate } from 'react-router-dom';

export default function Policies (){
    const customer = useSelector(state => state.customer)
    const cart = useSelector(state => state.cart)
    const cartSort = [...useSelector(state => state.cart.products)].sort((a, b) => a.id > b.id ? 1 : -1) 
    const inventory = useSelector(state => state.inventory)
    const partial = cart.products.filter(product => product.partial === true);
    const full = cart.products.filter(product => product.payInFull === true);
    const statusof = useSelector(state => state.statusof)
    const payment = cart.products.reduce((acc, obj) => acc + obj.payment, 0)
    const total = cart.products.reduce((acc, obj) => acc + obj.payment, 0)
    const outstanding = total //     << TOTAL NOT CORRECT
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);


    useEffect(()=>{
        fetchPolicies(setData, customer);
        console.log('running in policies')
    },[setData, customer]);

    return (
            <div>
            <br></br>
            <br></br>
            <div id='confirmation-page'>
            <span ><i>your Current Policies</i></span>
            <div id='confirmation-container'>
            <div id='confirmation-container-column'>
            {data.map((product, index) => {
                return(
                    <div id='confirmation-product' key={index}>
                        <div id='display-confirmation-line-item'>
                            <span>{product.policy}</span>
                        </div>
                        <div id='display-confirmation-line-item'>
                            <span>price: </span><span>${product.price}</span>
                        </div>
                        <div id='display-confirmation-line-item'>
                            <span>payment: </span><span>${product.payment}</span>
                        </div>
                        <div id='display-confirmation-line-item'>
                            <span>balance: </span><span>${product.balance}</span>
                        </div>
                    </div>
                )
            })}
            </div>

            <div id='confirmation-container-column'>
            {full.map((product, index) => {
                return(
                    <div id='confirmation-product' key={index}>
                        <span>{product.policy}</span>
                        <div id='display-confirmation-line-item'>
                            <span>price: </span><span>${product.price}</span>
                        </div>
                        <div id='display-confirmation-line-item'>
                            <span>payment: </span><span>${product.payment}</span>
                        </div>
                        <div id='display-confirmation-line-item'>
                            <span>balance: </span><span>${product.balance}</span>
                        </div>
                    </div>
                )
            })}
            </div>
            </div>
    
            </div>
            </div>           
    )
}