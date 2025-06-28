'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }

    // ✅ Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Invalid email format.')
      return
    }

    // ✅ Check password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('Registration successful. Please log in.')
        router.push('/login')
      } else {
        setError(data.message || 'Registration failed.')
      }
    } catch (err) {
      console.error(err)
      setError('Network or server error.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-64"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/login')}>
          Go to Login
        </span>
      </p>
    </div>
  )
}
