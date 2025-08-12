// reducers/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/blogsServices';

// گرفتن همه کاربران از API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    try {
      const response = await getAllUsers();
      return response.data; // داده‌ها باید آرایه باشند
    } catch (err) {
      console.error(err.message);
      return [];
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: [], // حالت اولیه: آرایه خالی
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload; // کل state رو با آرایه جدید جایگزین کن
    });
  },
});

// سلکتور برای گرفتن همه کاربران
export const selectAllUsers = (state) => state.users;

// سلکتور برای پیدا کردن کاربر با id
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === Number(userId));

export default usersSlice.reducer;
