'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import { RootState } from '../StoreProvider'; // adjust path if needed

export interface Blog {
  _id: string;
  title: string;
  content: string;
  [key: string]: any;
}

export interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk('blogs/fetch', async (_, thunkAPI) => {
  try {
    const res = await API.get('/blogs');
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createBlog = createAsyncThunk(
  'blog/create',
  async (formData: FormData, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const res = await fetch('https://blogs-backend-jx2t.onrender.com/api/blogs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Failed to create blog');
    return await res.json();
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, data }: { id: string; data: Partial<Blog> }, thunkAPI) => {
    try {
      const res = await API.put(`/blogs/${id}`, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk('blogs/delete', async (id: string, thunkAPI) => {
  try {
    await API.delete(`/blogs/${id}`);
    return id;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
