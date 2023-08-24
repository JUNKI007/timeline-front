import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../network/api";

const initialState = {};

// 주제 가져온다
export const getMySubjects = createAsyncThunk(
    'suject/getMySubjects',
    async () => {
        const response = await api(`api/v1/subjects/with-member`, "GET");
        const subjects = response.data
        console.log(subjects)
        return { subjects };  // heartCount는 서버 응답에 따라 변경될 수 있습니다.
    }
);

export const subjectSlice = createSlice({
    name: "mySubject",
    initialState,
    reducers: {},
    //     extraReducers: (builder) => {
    //         builder;
    // }
});

export default subjectSlice.reducer;