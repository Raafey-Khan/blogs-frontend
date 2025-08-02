
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStatus from './useAuthStatus';

export default function useAuthRedirect(redirectTo = '/login') {
  const { isAuthenticated, ready } = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [ready, isAuthenticated, router, redirectTo]);
}
