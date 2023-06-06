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

function Users (){
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
        <div className="Users">

            {console.log('Customer Slice Below')}
            {console.log(customer)}

            {console.log('Cart Slice Below')}
            {console.log(cart)}

            {console.log('Navigate  Below')}
            {console.log(statusof)}


            {/* ADD CUSTOMER */}
            <div id='add-customer-personal-info'>
            <input placeholder="Enter Name" name={'name'} value={input.name} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Enter Gender" name={'gender'} value={input.gender} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="address" name={'address'} value={input.address} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="phone" name={'phone'} value={input.phone} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="username" name={'username'} value={input.username} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="password" name={'password'} value={input.password} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>addCustomer(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getNewCustomer)}>Register</button>
            </div>

            {/* FIND CUSTOMER */}
            {/* <div id='find-customer-by-id'>
            <input placeholder='Enter ID' name={'idNumber'} value={input.idNumber} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>findCustomerbyID(
                input,
                setInput,
                dispatch,
                getCustomerByID)}>Find By ID</button>
            <span ><i>API Call To Database,</i></span>
            <span ><i>then dispatch to store</i></span>
            <div className="customer">
            <span>{customer._id}</span>
                <span>{customer.name}</span>
                <span>{customer.gender}</span>
                <span>{customer.company}</span>
            </div>
            </div> */}

            {/* SHOW ALL CUSTOMERS */}
            {/* <div id='show-all-customers'>
            <button onClick={
                (e)=>getAllCustomersFromDatabase(dispatch, getCustomers)}>Get All Customers</button>
            <span ><i>API Call To Database,</i></span>
            <span ><i>then dispatch to store</i></span>
            {customer.customers.length !== 0 ? 
            <div>
            {customer.customers.map((customer, index) => {
                return(
                    <div className='customer' key={index}>
                    <span> {customer._id} </span>
                    <span> {customer.name} </span>
                    <span> {customer.gender} </span>
                    <span> {customer.company} </span>
                </div>
                )})}
            </div>
            :
            <p>Click to Populate</p>
            }
            </div> */}

            {/* UPDATE PERSONAL INFO BY ID */}
            <div id='update-personal-info-by-id'>
            <input placeholder='Enter ID' name={'idNumber'} value={input.idNumber} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Enter Name" name={'name'} value={input.name} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Enter Gender" name={'gender'} value={input.gender} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Enter Company" name={'company'} value={input.company} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>updatePersonalInfo(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getUpDatedInfo)}>update personal</button>
            </div>

            {/* ADD PAYMENT INFO */}
            <div id='add-payment-info'>
            <input placeholder="Name on Card" name={'nameOnCard'} value={input.nameOnCard} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Card Type" name={'typeOf'} value={input.typeOf} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Card Number" name={'cardNumber'} value={input.cardNumber} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Expiration Date" name={'expiration'} value={input.expiration} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>addCardInfo(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getUpDatedInfo)}>Add Payment Info</button>
            </div>
            

            {/* LOGIN */}
            <div id='login'>
            <input placeholder="username" name={'username'} value={input.username} onChange={(e)=>handleChange(e, setInput)} />
            <input placeholder="Password" name={'password'} value={input.password} onChange={(e)=>handleChange(e, setInput)} />
            <button onClick={
                (e)=>handleLOGIN(
                    e,
                    input,
                    setInput,
                    dispatch,
                    getLoginDetails)}>LOGIN</button>
            </div>

            {/* INVENTORY */}
            <div className="show-all-inventory">
            <button onClick={
                (e)=>fetchInventory(
                    dispatch,
                    inventory,
                    addInventory
                    )}>GoTo Inventory N addTo Store</button>

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
                                )}>add to cart</button>

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
                    <button onClick={
                        (e)=>goToPaymentOptions(
                            e,
                            dispatch,
                            paymentOptionsStatus)}>Check Out</button>
                </div>

            {/* SHOPPING CART */}
            <div id="shopping-cart">
            <div><h4>cart</h4></div>
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
                <button onClick={(e)=> goToReviewOrder(
                    e,
                    cart) }>Review Order</button>
            </div>


            {/* CONFIRMATION PAGE */}
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
            <input type='submit' value='Confirm Purchase' onClick={(e)=>confirmOrder(
                e,
                cart,
                dispatch,
                customer,
                clearCart,
                addPolicies)}/>
            </div>
        </div>
    )
}

export default Users;