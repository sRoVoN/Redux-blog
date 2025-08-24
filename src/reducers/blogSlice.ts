// src/features/blogSlice.ts
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  nanoid,
  PayloadAction,
  EntityState,
  Middleware,
} from "@reduxjs/toolkit";
import { getAllBlogs } from "../services/blogsServices";
import type { RootState } from "../types";

// ---- Types ----
export interface Blog {
  id: string;
  title: string;
  body: string;
  userId: string | number;
  date: string;
  reactions: {
    heart: number;
    thumbsUp: number;
    thumbsDown: number;
    laughing: number;
    raisedEyebrow: number;
    sad: number;
  };
}

// ---- Async thunk ----
export const fetchBlogs = createAsyncThunk<Blog[], void, { state: RootState }>(
  "blogs/fetchBlogs",
  async (_, { getState }) => {
    const state = getState();
    const deletedIds = state.blogs.deletedIds;

    const response = await getAllBlogs();

    const grouped: Record<string, number> = {};
    const filtered: Blog[] = [];

    for (const blog of response.data) {
      if (!grouped[blog.userId]) grouped[blog.userId] = 0;

      if (grouped[blog.userId] < 2) {
        grouped[blog.userId]++;

        if (!deletedIds.includes(String(blog.id))) {
          filtered.push({
            ...blog,
            id: String(blog.id),
            date: new Date().toISOString(),
            reactions: {
              heart: 0,
              thumbsUp: 0,
              thumbsDown: 0,
              laughing: 0,
              raisedEyebrow: 0,
              sad: 0,
            },
          });
        }
      }
    }

    return filtered;
  }
);

// ---- Adapter ----
const blogsAdapter = createEntityAdapter<Blog>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// ---- State type ----
interface BlogsExtraState {
  deletedIds: string[];
}
type BlogsState = EntityState<Blog, string> & BlogsExtraState;

// ---- Load initial state from localStorage ----
const persistedState = localStorage.getItem("blogsState");
let initialState: BlogsState;

if (persistedState) {
  const parsed = JSON.parse(persistedState);
  initialState = blogsAdapter.getInitialState({
    deletedIds: parsed.deletedIds || [],
  });
  blogsAdapter.setAll(initialState, parsed.entitiesArray || []);
} else {
  initialState = blogsAdapter.getInitialState({
    deletedIds: [],
  });
}

// ---- Slice ----
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    blogAdded: {
      reducer(state, action: PayloadAction<Blog>) {
        blogsAdapter.addOne(state, action.payload);
      },
      prepare(title: string, body: string, userId: string | number) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId: String(userId),
            date: new Date().toISOString(),
            reactions: {
              heart: 0,
              thumbsUp: 0,
              thumbsDown: 0,
              laughing: 0,
              raisedEyebrow: 0,
              sad: 0,
            },
          } as Blog,
        };
      },
    },
    blogUpdated: (
      state,
      action: PayloadAction<{ id: string; title: string; body: string }>
    ) => {
      const { id, title, body } = action.payload;
      const existing = state.entities[id];
      if (existing) {
        existing.title = title;
        existing.body = body;
      }
    },
    blogDeleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      blogsAdapter.removeOne(state, id);
      if (!state.deletedIds.includes(id)) {
        state.deletedIds.push(id);
      }
    },
    reactionAdded: (
      state,
      action: PayloadAction<{ blogId: string; reaction: keyof Blog["reactions"] }>
    ) => {
      const { blogId, reaction } = action.payload;
      const blog = state.entities[blogId];
      if (blog && blog.reactions[reaction] !== undefined) {
        blog.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
      action.payload.forEach((blog) => {
        const id = blog.id;
        if (!state.entities[id] && !state.deletedIds.includes(id)) {
          blogsAdapter.addOne(state, blog);
        }
      });
    });
  },
});

// ---- Middleware: persist to localStorage ----
export const persistBlogsState: Middleware<{}, RootState> =
  (storeAPI) => (next) => (action) => {
    const result = next(action);
    const state = storeAPI.getState().blogs;
    const entitiesArray = Object.values(state.entities);
    localStorage.setItem(
      "blogsState",
      JSON.stringify({
        entitiesArray,
        deletedIds: state.deletedIds,
      })
    );
    return result;
  };

// ---- Exports ----
export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogSlice.actions;

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
} = blogsAdapter.getSelectors<RootState>((state) => state.blogs);

export default blogSlice.reducer;
