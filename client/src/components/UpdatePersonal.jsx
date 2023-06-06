import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleChange, updatePersonalInfo } from "../functions/handlers";
import { getUpDatedInfo } from "./store/customer/customerSlice";


export default function UpdatePersonal (){
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
        <div className="UpdatePersonal">

            {console.log('Customer Slice Below')}
            {console.log(customer)}
           
            <div id='updatePersonal'>
            <div><h3>UPDATE INFO</h3></div>
            <br></br>
            <input placeholder='Enter ID' name={'idNumber'} value={input.idNumber} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Enter Name" name={'name'} value={input.name} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Enter Gender" name={'gender'} value={input.gender} onChange={(e)=>handleChange(e, setInput)} />
            <br></br>
            <input placeholder="Enter Company" name={'company'} value={input.company} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>updatePersonalInfo(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getUpDatedInfo)}>update personal</button>
            </div>

         </div>
    )
}