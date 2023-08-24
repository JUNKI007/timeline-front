import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../network/api";

const initialState = { subjects: [] };

export const subjectSlice = createSlice({
    name: "mySubject",
    initialState,
    reducers: {
        setSubjects: (state, action) => {
            state.subjects = action.payload
        }
    },
});

export const { setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;