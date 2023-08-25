import { createSlice } from "@reduxjs/toolkit";

const IME = {
    id: "",
    nickName: "",
    token: "",
    email: "",
    profilePath: ""

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
            state.email = payload.email;
            state.profilePath = payload.profilePath;
        }
    },
});

export const { setState, setMe } = meSlice.actions;

export default meSlice.reducer;