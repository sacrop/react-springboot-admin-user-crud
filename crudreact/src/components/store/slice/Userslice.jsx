import { createSlice } from "@reduxjs/toolkit"

const tokenfromlocalstorage = localStorage.getItem("jwttoken");
const rolefromlocalstorage = localStorage.getItem("role");
const initialstate = {
    token: tokenfromlocalstorage||"",
    loginStatus: !!tokenfromlocalstorage,
    role: rolefromlocalstorage||""
}

export const UserSlice = createSlice({
    name: "userman",
    initialState: initialstate,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.loginStatus = true;
            state.role = action.payload.role;
            localStorage.setItem("jwttoken", state.token);
            localStorage.setItem("role", state.role)
        },
        logout: (state) => {
            state.token = "";
            state.loginStatus = false;
            state.role = "";
            localStorage.removeItem("jwttoken");
            localStorage.removeItem("role");
        }
    }
})
export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;