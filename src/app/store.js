import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';
import commentsReducer from '../feature/commentSlice';
import subjectSlice from '../feature/subjectSlice';
import openPostingModalReducer from '../feature/postingModalOpen';
import meSlice from '../feature/meSlice';

export default configureStore({
    reducer: {
        likes: likesReducer,
        comments: commentsReducer,
        subjects: subjectSlice,
        openPostingModal: openPostingModalReducer,
        me: meSlice,
    }
});
