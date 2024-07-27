// src/features/profilePage/ProfilePageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserAPI } from './ProfilePageAPI';

export const createUser = createAsyncThunk(
  'profilePage/createUser',
  async (userData) => {
    const response = await createUserAPI(userData);
    return response;
  }
);

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profilePageSlice.reducer;
