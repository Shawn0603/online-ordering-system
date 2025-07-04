'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/user');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-yellow-50 to-orange-100

">
      <h1 className="text-3xl font-bold mb-1 text-gray-800">
        Online Food Ordering System
      </h1>
      <h2 className="text-md text-gray-600 mb-6">User Login Portal</h2>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => router.push('/register')}
          className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded hover:bg-gray-300 transition"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded hover:bg-gray-200 transition"
        >
          Back to Dashboard
        </button>
      </form>
    </main>
  );
}
