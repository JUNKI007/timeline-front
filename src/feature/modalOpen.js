import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postingModal_isOpen: false,
    addSubjectModal_isOpen: false
}; // 초기 상태를 false로 설정

export const openModalSclice = createSlice({
    name: "isOpenModal",
    initialState,
    reducers: {
        setPostinModalOpen: (state, action) => {
            state.postingModal_isOpen = action.payload;
        },
        setAddSubjectModalOpen: (state, action) => {
            state.addSubjectModal_isOpen = action.payload;
        }
    }
});

export const { setPostinModalOpen, setAddSubjectModalOpen } = openModalSclice.actions;

export default openModalSclice.reducer;