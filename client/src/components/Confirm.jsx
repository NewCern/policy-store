import React, { useState } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCustomerByID, getCustomers, addPolicies, getLoginDetails, getNewCustomer, getUpDatedInfo } from "./store/customer/customerSlice";
import { addCardInfo, addCustomer, addRemoveButtons, confirmOrder, fetchInventory, fullPaymentCheckBox, getAllCustomersFromDatabase, goToPaymentOptions, goToReviewOrder} from "../functions/handlers";
import { handleChange, handleLOGIN, partialPaymentCheckBox, resetPartialPayment, submitPartialPayment, updatePersonalInfo} from "../functions/handlers";
import { clearCart, addPartial, addToCart, checked, removeFromCart, resetPartial } from "./store/cart/cartSlice";
import { useNavigate } from 'react-router-dom';

export default function Confirm (){
    const customer = useSelector(state => state.customer)
    const cart = useSelector(state => state.cart)
    const cartSort = [...useSelector(state => state.cart.products)].sort((a, b) => a.id > b.id ? 1 : -1) 
    const inventory = useSelector(state => state.inventory)
    const partial = cart.products.filter(product => product.partial === true);
    const full = cart.products.filter(product => product.payInFull === true);
    const statusof = useSelector(state => state.statusof)
    const payment = cart.products.reduce((acc, obj) => acc + obj.payment, 0)
    const total = cart.products.reduce((acc, obj) => acc + obj.payment, 0)
    // const outstanding = total - payment //     << TOTAL NOT CORRECT
    const outstanding = total //     << TOTAL NOT CORRECT
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

    return (
            <div>
            <br></br>
            <br></br>
            <div id='confirmation-page'>
            <span ><i>Review Your Purchase</i></span>
            <div id='confirmation-container'>
            <div id='confirmation-container-column'>
            {partial.map((product, index) => {
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
            <h4>total  ${outstanding}</h4>
            <input link={'paymentmethod'} type='submit' value='EnterCard Info' onClick={(e)=>confirmOrder(
                e,
                cart,
                dispatch,
                customer,
                navigate,
                clearCart,
                addPolicies)}/>
            </div>
            </div>           
    )
}