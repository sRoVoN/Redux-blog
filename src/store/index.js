import { configureStore } from "@reduxjs/toolkit";
import blogReducer from '../reducers/blogSlice';
import usersReducer, { fetchUsers } from "../reducers/userSlice";
import { loadState, saveState } from '../utils/localStorage';

const persistedState = loadState();
export const store = configureStore({
    reducer: {
        blogs: blogReducer,
        users: usersReducer,
    },
    preloadedState: persistedState
});
store.dispatch(fetchUsers());

store.subscribe(() => {
  saveState({
    blogs: store.getState().blogs,
    users: store.getState().users,
  });
});