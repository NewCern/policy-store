import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
       
    ],
}

// this is a combination of actions and reducers
export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addInventory: (state, action) => {
            return {
                ...state,
                products: action.payload,
            }
        }
    },
})

export const {addInventory} = inventorySlice.actions;
export default inventorySlice.reducer;