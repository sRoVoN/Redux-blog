// reducers/userSlice.ts
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { getAllUsers } from "../services/blogsServices";

// ---- User model ----
export interface User {
  id: string | number;
  name: string;
  username: string;
  email?: string;
}

// ---- Thunk ----
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data as User[];
});

// ---- Adapter ----
const usersAdapter = createEntityAdapter<User>(); 

// ---- State ----
type UsersState = EntityState<User, string | number> & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UsersState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
})
// ---- Slice ----
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// ---- Selectors ----
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: { users: UsersState }) => state.users);

export default usersSlice.reducer;
