import { createSlice } from "@reduxjs/toolkit";

const IME = {
    id: "",
    nickName: "",
    token: ""

};

export const meSlice = createSlice({
    name: "me",
    initialState: { ...IME },
    reducers: {
        setState: (state, { payload }) => {
            state.token = payload.data;
        },
        setMe: (state, { payload }) => {
            state.id = payload.id;
            state.nickName = payload.nickName;
        }
    },
});

export const { setState, setMe } = meSlice.actions;

export default meSlice.reducer;