import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';
import commentsReducer from '../feature/commentSlice';
import subjectSlice from '../feature/subjectSlice';
import openPostingModalReducer from '../feature/postingModalOpen';

export default configureStore({
    reducer: {
        likes: likesReducer,
        comments: commentsReducer,
        mySubjects: subjectSlice,
        openPostingModal: openPostingModalReducer
    }
});
