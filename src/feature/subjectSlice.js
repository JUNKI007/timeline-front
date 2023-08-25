import { createSlice } from "@reduxjs/toolkit";

const initialState = { subjects: [] };

export const subjectSlice = createSlice({
    name: "mySubject",
    initialState,
    reducers: {
        setSubjects: (state, action) => {
            state.subjects = action.payload
        },
        addSubject: (state, action) => {
            const newSubject = action.payload;
            state.subjects = [...state.subjects, newSubject];
        }
    },
});

export const { setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;