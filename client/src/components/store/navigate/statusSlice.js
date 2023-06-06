import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: false,
    customerInfoStatus: false,
    paymentInfoStatus: false,
    inventoryStatus: false,
    paymentOptionsStatus: false,
    confirmationStatus: false,
}

// this is a combination of actions and reducers
export const statusSlice = createSlice({
    name: 'statusof',
    initialState,
    reducers: {
        loginStatus: (state, action) => {
            return {
                ...state,
                loginStatus: action.payload,
            }
        },
        paymentInfoStatus: (state, action) => {
            return {
                ...state,
                paymentInfoStatus: action.payload,
            }
        },
        customerInfoStatus: (state, action) => {
            return {
                ...state,
                customerInfoStatus: action.payload,
            }
        },
        paymentOptionsStatus: (state, action) => {
            return {
                ...state,
                paymentOptionsStatus: action.payload,
            }
        },
        inventoryStatus: (state, action) => {
            return {
                ...state,
                inventoryStatus: action.payload,
            }
        },
        confirmationStatus: (state, action) => {
            return {
                ...state,
                inventoryStatus: action.payload,
            }
        },
       
    },
})

export const {confirmationStatus, loginStatus, paymentInfoStatus, customerInfoStatus, inventoryStatus, paymentOptionsStatus} = statusSlice.actions;
export default statusSlice.reducer;