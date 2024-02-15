import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:0
};
export const CounterSlice=createSlice({
    name:"counter",
    initialState:initialState,
    reducers:{
        incrementcounter:(state,action)=>{
            console.log(state.val+"initialize counter")
            state.value+=1;
            // setInterval(()=>{state.value=state.value+1},1000);
            
        }
    }
})
export default CounterSlice.reducer;
export const {incrementcounter}=CounterSlice.actions;