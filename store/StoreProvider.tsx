'use client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
  preloadedState: {
    auth: {
      token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
      loading: false,
      error: null,
    },
    blog: {
      blogs: [],
      loading: false,
      error: null,
    }
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hook for typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();


export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
