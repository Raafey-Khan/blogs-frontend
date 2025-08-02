'use client';
import Link from 'next/link';
import Image from 'next/image';
import signupImage from '../public/signup.jpg'; 

export default function HomePage() {
  return (
    <div className="relative min-h-[100vh] overflow-hidden">
    
      <Image
        src={signupImage}
        alt="Background"
        fill
        className="object-cover opacity-10 pointer-events-none z-18"
        priority
      />
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 py-20 min-h-[100vh] bg-gradient-to-br from-blue-50 via-white to-purple-100  dark:via-gray-800 dark:to-gray-900 bg-opacity-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black dark:text-white leading-tight">
          Write. Share. Inspire.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-black dark:text-gray-300 max-w-2xl">
          Create beautiful blogs, share your thoughts, and connect with others. Join the platform where your voice matters.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <span className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer">
              Login
            </span>
          </Link>
          <Link href="/register">
            <span className="inline-block border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-medium px-6 py-3 rounded-lg transition">
              Sign Up
            </span>
          </Link>
        </div>

        <div className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
          ✍️ Built with Next.js, Redux Toolkit & MongoDB
        </div>
      </div>
    </div>
  );
}
