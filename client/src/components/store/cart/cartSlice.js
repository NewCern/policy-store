import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
 
    ],
    // total: 0,
}

// this is a combination of actions and reducers
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const products = state.products
            return {
                ...state,
                products: [
                    ...products,
                    {
                        ...action.payload 
                    }
                ]
            }
        },
        removeFromCart: (state, action) => {
            return {
                ...state,
                products: action.payload,
            }
        },
        addPartial: (state, action) => {
            const products = state.products.filter(product => product.id != action.payload.id)
            return {
                ...state,
                products: [
                    ...products,

                    {
                        ...action.payload,
                    },

                ]
            }
        },
        checked: (state, action) => {
            const products = state.products.filter(product => product.id != action.payload.id)
            return {
                ...state,
                products: [
                    ...products,
                    {
                        ...action.payload
                    }
                ],

                
            }
        },
        resetPartial: (state, action) => {
            const products = state.products.filter(product => product.id != action.payload.id)
            return {
                ...state,
                products: [
                    ...products,
                    {
                       ...action.payload
                    }
                ]
            }
        },
        clearCart: (state, action) => {
            return {
                ...state,
                products: []
            }
        },
    },
})

export const {clearCart, checked, resetPartial, addPartial, addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;