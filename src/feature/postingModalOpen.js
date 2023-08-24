import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false }; // 초기 상태를 false로 설정

export const openPostingModalSclice = createSlice({
    name: "openPostingModal",
    initialState,
    reducers: {
        setBool: (state, action) => {
            state.isOpen = action.payload;
        }
    }
});

export const { setBool } = openPostingModalSclice.actions;

export default openPostingModalSclice.reducer;