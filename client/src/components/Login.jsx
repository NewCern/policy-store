import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCustomer, handleChange, handleLOGIN, navigateTo } from "../functions/handlers";
import { getLoginDetails, getNewCustomer } from "./store/customer/customerSlice";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "./store/navigate/statusSlice";


function Login (){
    const customer = useSelector(state => state.customer)
    const navigate = useNavigate();
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
        <div className="Login">
            {console.log('Customer Slice Below')}
            {console.log(customer)}
            <div id='login'>
            <button link={'register'} onClick={
                (e)=>navigateTo(
                    e,
                    navigate)}>REGISTER</button>
            <div id='or-container'>
                <div id='dash'>__________</div>
                <div id='or'> &nbsp; or &nbsp; </div>
                <div id='dash'>__________</div>
            </div>
            <br></br>
            <input placeholder="username" name={'username'} value={input.username} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Password" name={'password'} value={input.password} onChange={(e)=>handleChange(e, setInput)} />
            <button link={'home'} onClick={
                (e)=>handleLOGIN(
                    e,
                    input,
                    setInput,
                    dispatch,
                    navigate,
                    loginStatus,
                    getLoginDetails)}>LOGIN</button>
            </div>

         </div>
    )
}

export default Login;