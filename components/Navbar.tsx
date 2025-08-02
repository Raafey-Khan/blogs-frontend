'use client';
import Link from 'next/link';
import { useAppDispatch } from '../store/StoreProvider';
import { logout } from '../store/slices/authSlice';
import useAuthStatus from '../hooks/useAuthStatus';
import '../styles/globals.css';

export default function Navbar() {
  const { isAuthenticated, ready } = useAuthStatus();
  const dispatch = useAppDispatch();

  if (!ready) return null; 

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Blog App</Link>
      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={() => dispatch(logout())} className="hover:underline cursor-pointer">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
