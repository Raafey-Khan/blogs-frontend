'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import {toast} from 'react-toastify';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await API.post('/auth/login', credentials);
      return res.data.token;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.response?.data || err.message || 'Login failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      await API.post('/auth/register', credentials);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null as null | string,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
        toast.success("Login successful!")
      })

      .addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
  toast.error(state.error || "Login failed.")
})

     
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
