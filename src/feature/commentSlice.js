import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../network/api";

const initialState = {
  commentsByPostId: {},
};


export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId) => {
    const response = await api(`/api/v1/comments/to-post/${postId}`, "GET");
    return { postId, comments: response.data };
  }
);

export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, comment }) => {
    const response = await api(`/api/v1/comments/to-post/${postId}`, "POST", { comment });
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsByPostId[postId] = comments;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const comment = action.payload;
        if (state.commentsByPostId[comment.post.id]) {
          state.commentsByPostId[comment.post.id].push(comment);
        } else {
          state.commentsByPostId[comment.post.id] = [comment];
        }
      });
  }
});

export default commentSlice.reducer;
