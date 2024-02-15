import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './slice/Userslice'
import counterReducer from './slice/CounterSlice'
export const Store=configureStore({
    reducer:{
        userReducer:UserReducer,
        counterReducer:counterReducer
    },

}
);