import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';
import commentsReducer from '../feature/commentSlice';
import subjectSlice from '../feature/subjectSlice';
import openModalReducer from '../feature/modalOpen';
import meSlice from '../feature/meSlice';

export default configureStore({
    reducer: {
        likes: likesReducer,
        comments: commentsReducer,
        subjects: subjectSlice,
        openModal: openModalReducer,
        me: meSlice,
    }
});
