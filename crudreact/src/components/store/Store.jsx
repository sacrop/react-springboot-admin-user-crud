import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slice/Userslice'
export const Store=configureStore({
    reducer:{
        userReducer:UserReducer
    },

}
);