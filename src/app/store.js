import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';
import commentsReducer from '../feature/commentSlice';
import subjectSlice from '../feature/subjectSlice';

export default configureStore({
    reducer: {
        likes: likesReducer,
        comments: commentsReducer,
        subjects: subjectSlice
    }
});
