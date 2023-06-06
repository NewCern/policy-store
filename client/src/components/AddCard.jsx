import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleChange, addCardInfo, showPurchase } from "../functions/handlers";
import { addPolicies, getUpDatedInfo } from "./store/customer/customerSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "./store/cart/cartSlice";


export default function AddCard (){
    const customer = useSelector(state => state.customer)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        nameOnCard: '',
        typeOf: '',
        cardNumber: '',
        expiration: '',
    })

    useEffect(()=>{
        // console.log(customers)
    },[])
    return (
        <div className="AddCard">

            {console.log('Customer Slice Below')}
            {console.log(customer)}
           
            <div id='addcard'>
            <div><h3>CARD INFORMATION</h3></div>
            <br></br>
            <input placeholder="Name on Card" name={'nameOnCard'} value={input.nameOnCard} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Card Type" name={'typeOf'} value={input.typeOf} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Card Number" name={'cardNumber'} value={input.cardNumber} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Expiration Date" name={'expiration'} value={input.expiration} onChange={(e)=>handleChange(e, setInput)} />
            <button link={'showpurchase'} onClick={
                (e)=>showPurchase(
                    e,
                    cart,
                    input,
                    setInput,
                    dispatch,
                    customer,
                    navigate,
                    clearCart,
                    addPolicies)}>Complete Purchase</button>
            </div>

         </div>
    )
}