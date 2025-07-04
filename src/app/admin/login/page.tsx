'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/admin')
    } else {
      setError(data.error || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Smart Online Ordering System
        </h1>
        <h2 className="text-md text-center text-gray-500 mb-6">
          Admin Portal
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white font-semibold px-4 py-3 rounded w-full hover:bg-blue-700 mb-3 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push('/')}
          className="bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded w-full hover:bg-gray-300 transition"
        >
          Back to Home
        </button>
      </div>
    </main>
  )
}
