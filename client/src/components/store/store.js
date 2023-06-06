// import { configureStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import customerSlice from "./customer/customerSlice";
import inventorySlice from "./inventory/inventorySlice";
import statusSlice from "./navigate/statusSlice";

export const store = configureStore({
    reducer: {
        
        customer: customerSlice,
        cart: cartSlice,
        inventory: inventorySlice,
        statusof: statusSlice,
    },
})