import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange, navigateTo, updatePersonal } from "../functions/handlers";


export default function NavBar (){
    const customer = useSelector(state => state.customer);
    const cart = useSelector(state => state.cart.products.length);
    const id = customer._id;
    const navigate = useNavigate();

        return(
            <div className="NavBar">
                <div id="navbar-buttons">
                    <button link="home" onClick={(e)=>navigateTo(e,navigate)}>home</button>
                    <button link="update" onClick={(e)=>navigateTo(e,navigate)}>My info</button>
                    <button link="policies" onClick={(e)=>navigateTo(e,navigate)}>Policies</button>
                    <span>CART <b>{cart}</b></span>
                    <span><b>{customer.name}</b></span>
                </div>
            </div>
        )
}