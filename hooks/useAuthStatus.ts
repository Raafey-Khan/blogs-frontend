
'use client';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../store/StoreProvider';

export default function useAuthStatus() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true); // Prevent hydration issues
  }, []);

  return {
    isAuthenticated: !!token,
    token,
    ready,
  };
}
