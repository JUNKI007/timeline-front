import { configureStore } from '@reduxjs/toolkit';
import likesReducer from '../feature/likeSlice';

export default configureStore({
    reducer: {
        likes: likesReducer 
    }
});
