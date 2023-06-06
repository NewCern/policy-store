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

export default function PaymentOptions (){
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

    return (
            <div>
            <br></br>
            <br></br>
            <div id="shopping-cart">
            <div><span>cart</span></div>
            {/* {cart.products.map((item, index) => { */}
            {cartSort.map((item, index) => {
                return(
                    <div id='product-cart' key={index} link={item.id}>
                        <span id='policy-name'>{item.policy}</span>
                        <div id='product-cart-price-before-payment'>
                            <div id='product-cart-price'>
                                <span>price: </span><span><b>${item.price}</b></span>
                            </div>
                        </div>
                        { item.payment?
                        <div id='product-cart-price-after-payment'>
                            <div id='product-cart-price'>
                                <span>payment: </span><span><b>${item.payment}</b></span>
                            </div>                           
                            <div id='product-cart-price'>
                                <span>balance: </span><span><b>${item.balance}</b></span>
                            </div>                                                  
                        </div> 

                         : 
                         '' }

                        {
                        statusof.paymentOptionsStatus ?             // When checkout button is clicked, show options
                   
                        <div id='product-cart-checkbox-container'>
                            
                            <div id='checkboxes'>
                                <input link={item.id} className='paid-in-full-check' type="checkbox" tag="check-pay-in-full"  onClick={
                                    (e)=>fullPaymentCheckBox(
                                        e,
                                        cart,
                                        checked,
                                        dispatch)}/>
                                  <span> Pay in Full </span> 
                            </div>

                            <div id='checkboxes'>
                                <input link={item.id} className='partial-payment-check' type="checkbox" tag="check-partial-payment"  onClick={
                                    (e)=>partialPaymentCheckBox(
                                        e, 
                                        cart,
                                        checked, 
                                        dispatch)}/>
                                <span> Partial Payment </span>
                                <input id='payment-input' name={'amount'} value={input.amount} type='number' placeholder="amount"  onChange={
                                    (e)=>handleChange(
                                        e, 
                                        setInput)} />
                                <input id='submit-partial-payment' link={item.id} type='submit' onClick={
                                    (e)=>submitPartialPayment(
                                        e,
                                        cart,
                                        input,
                                        setInput,
                                        dispatch,
                                        addPartial)}/>
                            </div>
                            <input id='reset-partial-payment' link={item.id} type='submit' value="reset" onClick={
                                (e)=>resetPartialPayment(
                                    e,
                                    cart,
                                    input,
                                    setInput,
                                    dispatch,
                                    resetPartial)}/>
                        </div>
                             :
                             ''
                             }
                    </div>
                    )
                })}
                {/* <span>Total: </span><span>{outstanding}</span> */}
                <button link={'confirm'} onClick={(e)=> goToReviewOrder(
                    e,
                    cart,
                    navigate) }>Review Order</button>
            </div>           
            </div>           
    )
}