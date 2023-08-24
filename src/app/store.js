import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';
import commentsReducer from '../feature/commentSlice';

export default configureStore({
    reducer: {
        likes: likesReducer,
        comments: commentsReducer
    }
});
