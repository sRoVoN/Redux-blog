import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogSlice";
import userReducer from "../reducers/userSlice";
import { localStorageMiddleware } from "../middleware/localStorageMiddleware";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

