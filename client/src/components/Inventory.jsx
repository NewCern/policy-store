import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomerByID, getCustomers, addPolicies, getLoginDetails, getNewCustomer, getUpDatedInfo } from "./store/customer/customerSlice";
import { addCardInfo, addCustomer, addRemoveButtons, confirmOrder, fetchInventory, fullPaymentCheckBox, getAllCustomersFromDatabase, goToPaymentOptions, goToReviewOrder} from "../functions/handlers";
import { handleChange, handleLOGIN, partialPaymentCheckBox, resetPartialPayment, submitPartialPayment, updatePersonalInfo} from "../functions/handlers";
import { findCustomerbyID } from "../functions/handlers";
import { addInventory } from "./store/inventory/inventorySlice";
import { clearCart, addPartial, addToCart, checked, removeFromCart, resetPartial } from "./store/cart/cartSlice";
import { paymentInfoStatus, paymentOptionsStatus } from "./store/navigate/statusSlice";
import { useNavigate } from "react-router-dom";

export default function Inventory (){
    const customer = useSelector(state => state.customer)
    const cart = useSelector(state => state.cart)
    const cartSort = [...useSelector(state => state.cart.products)].sort((a, b) => a.id > b.id ? 1 : -1) 
    const inventory = useSelector(state => state.inventory)
    const partial = cart.products.filter(product => product.partial === true);
    const full = cart.products.filter(product => product.payInFull === true);
    const statusof = useSelector(state => state.statusof)
    const payment = cart.products.reduce((acc, obj) => acc + obj.payment, 0)
    const total = cart.products.reduce((acc, obj) => acc + obj.price, 0)
    const outstanding = total - payment; //     << TOTAL NOT CORRECT
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
        fetchInventory(
            dispatch,
            inventory,
            addInventory
            )},[])
    return (

           <div className="Inventory">
        {/* //     <div id="slideContainer">
        //         <div id="slideImages">
        //             <img src={image3} alt="image3" id="copyOfLast" height="300"/>
        //             <img src={image1} alt="image1" height="300"/>
        //             <img src={image2} alt="image2" height="300"/>
        //             <img src={image3} alt="image3" height="300"/>
        //             <img src={image1} alt="image1" id="copyOfFirst" height="300"/>
        //         </div>
        //         <div id="buttons">
        //             <button id="prev">&#8810;</button>
        //             <button id="next">&#8811;</button>
        //         </div>
        //     </div> */}
            <div className="show-all-inventory">
            
            {console.log('Inventory Slice Below')}
            {console.log(inventory)}
            {console.log('Cart Slice Below')}
            {console.log(cart)}
            {inventory.products.map((product, index) => {
                return (
                    <div key={index} className='product' >
                        <span>{product.policy}</span>
                        <span>${product.price}</span>
                        <button tag='add' className='add' link={product.id} 
                            onClick={
                                (e)=>addRemoveButtons(
                                    e,
                                    cart,
                                    dispatch,
                                    addToCart,
                                    inventory,
                                    removeFromCart
                                )}>purchase</button>

                        <button id='remove-from-cart' tag='remove' className="remove" link={product.id} 
                                onClick={
                                    (e)=>addRemoveButtons(
                                     e,
                                     cart,
                                     dispatch,
                                     addToCart,
                                    inventory,
                                    removeFromCart
                                )}>remove</button>
                    </div>
                        )
                    })}
                </div>
                <button link={'paymentoptions'} id='inventory-checkout' onClick={
                        (e)=>goToPaymentOptions(
                            e,
                            navigate,
                            dispatch,
                            paymentOptionsStatus)}>Check Out</button> 
           </div>
           


    )
}