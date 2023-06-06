import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleChange, addCustomer } from "../functions/handlers";
import { getNewCustomer } from "./store/customer/customerSlice";

function Register (){
    const customer = useSelector(state => state.customer)
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        idNumber:'',
        name: '',
        gender: '',
        address: '',
        phone: '',
        username: '',
        password: '',
        company: '',
        nameOnCard: '',
        typeOf: '',
        cardNumber: '',
        expiration: '',
        amount: '',
    })

    useEffect(()=>{
        // console.log(customers)
    },[])
    return (
        <div className="Register">

            {console.log('Customer Slice Below')}
            {console.log(customer)}
           
            <div id='register'>
            <div><h3>REGISTRATION</h3></div>
            <br></br>
            <br></br>
            <input placeholder="Enter Name" name={'name'} value={input.name} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Enter Gender" name={'gender'} value={input.gender} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="address" name={'address'} value={input.address} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="phone" name={'phone'} value={input.phone} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="username" name={'username'} value={input.username} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="password" name={'password'} value={input.password} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>addCustomer(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getNewCustomer)}>Register</button>
            </div>

         </div>
    )
}

export default Register;