import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../network/api";

const initialState = {};

// 좋아요 수를 가져오는 비동기 액션
export const fetchHeartsThunk = createAsyncThunk(
  'likes/fetchHearts',
  async (postId) => {
    const response = await api(`/api/v1/hearts/${postId}`, "GET");
    return { postId, heartCount: response.data.heartCount };  // heartCount는 서버 응답에 따라 변경될 수 있습니다.
  }
);

export const updateLikeThunk = createAsyncThunk(
  'likes/updateLike',
  async (postId) => {
    const response = await api(`/api/v1/hearts/to-post/${postId}`, 'POST');
    return { postId, heartCount: response.data.heartCount };  // heartCount는 서버 응답에 따라 변경될 수 있습니다.
  }
);


export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeartsThunk.fulfilled, (state, action) => {
        const { postId, heartCount } = action.payload;
        state[postId] = heartCount;
      })
      .addCase(updateLikeThunk.fulfilled, (state, action) => {
        const { postId, heartCount } = action.payload;
        state[postId] = heartCount;
      });
  }
});

export default likeSlice.reducer;