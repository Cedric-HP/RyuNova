import { configureStore } from '@reduxjs/toolkit'
import utilitisesReducer from './utilitisesReducer/utilitisesReducer';
import authSlice from './authSliceReducer/authSlice';

const store = configureStore({
    devTools: true,
    reducer: {
      auth: authSlice,
      utilitisesReducer: utilitisesReducer
    }
})

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default store