import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getAllUsres } from '../services/blogsServices';


export const fetchUsers = createAsyncThunk(`/users/fetchusers`, async () => {
    try{
      const response = await getAllUsres();
      return response.data;
      
    }catch(err){
      console.log(err.message);
    }
  });

const usersSlice = createSlice ({
    name: "users",
    initialState: [],
    reducers: {

    },
    extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state , action) => {
        return action.payload;
      });
    },
});

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
  state.users.find(user => user.id === Number(userId));

export default usersSlice.reducer;

