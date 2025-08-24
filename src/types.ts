// src/types.ts
import type blogReducer from "./reducers/blogSlice";
import type userReducer from "./reducers/userSlice";
import type { AnyAction } from "@reduxjs/toolkit";
import type { ThunkDispatch } from "redux-thunk";

// 🔹 State هر ردیوسر رو از خود ردیوسر می‌گیریم
export type BlogsState = ReturnType<typeof blogReducer>;
export type UsersState = ReturnType<typeof userReducer>;

// 🔹 ساخت RootState کلی
export interface RootState {
  blogs: BlogsState;
  users: UsersState;
}

// 🔹 برای dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

