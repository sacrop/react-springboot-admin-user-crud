import { createSlice } from "@reduxjs/toolkit"

const tokenfromlocalstorage=localStorage.getItem("jwttoken")
const initialstate={
    token:tokenfromlocalstorage||""
    ,loginStatus:!!tokenfromlocalstorage
}

export const UserSlice=createSlice({
    name:"userman",
    initialState:initialstate,
    reducers:{
        login:(state,action)=>{
            state.token=action.payload.token;
            state.loginStatus=true;
        },
        logout:(state)=>{
            state.token="";
            state.loginStatus=false;
        }
    }    
})
export const {login,logout}=UserSlice.actions;
export default UserSlice.reducer;