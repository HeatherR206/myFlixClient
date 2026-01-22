import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const tokenSlice = createSlice({
    name: "token",
    initialState: storedToken ? storedToken : null,
    reducers: {
        setToken: (state, action) => action.payload,
        clearToken: () => null
    }
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;