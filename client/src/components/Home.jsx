import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { navigateTo } from "../functions/handlers";
import { useNavigate } from "react-router-dom";


function Home (){
    const customer = useSelector(state => state.customer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    <div className="home-background">
        <div className="Home">
        {console.log('FROM ACCOUNT PAGE')}
        {console.log(customer)}
        <h1>Welcome {customer.name}</h1>
        <p>What would you like to do?</p>
        <div className="options">
            <button link="inventory" onClick={(e)=>navigateTo(e, navigate)} >Shop Policies</button>
            {/* <button link="makepaymentpersonal" onClick={(e)=>navigateTo(e,navigate)} >Make a Payment</button>
            <button link="paymentmethod" onClick={(e)=>navigateTo(e,navigate)}>Add Payment</button> */}
        </div>
        </div>
        
</div>
    )
}

export default Home;