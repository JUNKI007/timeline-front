import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../network/api";

const initialState = {
  commentsByPostId: {},
};

// 게시글에 해당하는 댓글들을 가져오는 비동기 액션
export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId) => {
    const response = await api(`/comments/to-post/${postId}`, "GET");
    return { postId, comments: response.data };
  }
);

// 댓글 추가하는 비동기 액션
export const addComment = createAsyncThunk(
  'comments/add',
  async ({ postId, comment }) => {
    const response = await api(`/comments/to-post/${postId}`, "POST", { comment });
    return response.data; // 새로 추가된 댓글 정보
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
