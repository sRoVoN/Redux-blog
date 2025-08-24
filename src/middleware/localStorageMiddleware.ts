// src/middleware/localStorageMiddleware.ts
import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../types";

const STORAGE_KEY = "blogs";

export const localStorageMiddleware: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);

    const actionsToSync = [
      "blogs/blogAdded",
      "blogs/blogUpdated",
      "blogs/blogDeleted",
      "blogs/reactionAdded",
      "blogs/fetchBlogs/fulfilled",
    ];

    // ✅ type guard برای دسترسی به action.type
    if (
  typeof action === "object" &&
  action !== null &&
  "type" in action &&
  typeof action.type === "string"
) {
  if (actionsToSync.includes(action.type)) {
    try {
      const state = storeAPI.getState().blogs;
      const blogsArray = state.ids.map(
        (id: string | number) => state.entities[id]
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogsArray));
      console.log("Saved blogs to localStorage:", blogsArray.length);
    } catch (err) {
      console.error("Error saving blogs to localStorage", err);
    }
  }
}

    return result;
  };
