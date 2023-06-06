import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    gender: '',
    company: '',
    policies: [],
    // customers:[],
}

// this is a combination of actions and reducers
export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        getCustomers: (state, action) => {
            return {
                ...state,
                customers: action.payload,
            }
        },
        getCustomerByID: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        getNewCustomer: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        getLoginDetails: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        getUpDatedInfo: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        addPolicies: (state, action) => {
            return {
                ...state,
                policies: action.payload,
            }
        },
    },
})

export const {addPolicies, getLoginDetails ,getUpDatedInfo, getNewCustomer ,getCustomers, getCustomerByID} = customerSlice.actions;
export default customerSlice.reducer;