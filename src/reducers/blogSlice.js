// src/reducers/blogSlice.js
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getAllBlogs } from "../services/blogsServices";

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const response = await getAllBlogs();
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    blogAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            body: content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
              thumbsDown: 0,
              laughing: 0,
              raisedEyebrow: 0,
              sad: 0,
            },
          },
        };
      },
    },
    blogUpdated: (state, action) => {
      const { id, title, body } = action.payload;
      const existingBlog = state.find((blog) => blog.id === id);
      if (existingBlog) {
        existingBlog.title = title;
        existingBlog.body = body;
      }
    },
    blogDeleted: (state, action) => {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    reactionAdded: (state, action) => {
      const { blogId, reaction } = action.payload;
      const existingBlog = state.find((blog) => blog.id === blogId);
      if (existingBlog && existingBlog.reactions[reaction] !== undefined) {
        existingBlog.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllBlogs = (state) => state.blogs;
export const selectBlogById = (state, blogId) =>
  state.blogs.find((blog) => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } =
  blogSlice.actions;

export default blogSlice.reducer;
