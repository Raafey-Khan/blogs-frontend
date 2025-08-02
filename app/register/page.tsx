'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store/StoreProvider';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required");
      return;
    }

    const result = await dispatch(registerUser({ username, password }));
    if ((result as any).meta.requestStatus === 'fulfilled') {
      toast.success("Registration successful. You can now login.");
      router.push('/login');
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Username"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-medium py-2.5 rounded cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 dark:text-green-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
