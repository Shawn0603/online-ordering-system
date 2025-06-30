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
      router.push('/admin') // 登录成功跳转
    } else {
      setError(data.error || 'Login failed')
    }
  }

  return (
    <main className="max-w-md mx-auto p-6 flex flex-col justify-center min-h-screen">
      {/* 标题 */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Portal</h1>

      {/* 错误提示 */}
      {error && (
        <p className="text-red-500 mb-4 text-center">{error}</p>
      )}

      {/* 输入表单 */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Login
      </button>

      {/* 返回游客界面 */}
      <button
        onClick={() => router.push('/')}
        className="text-sm text-gray-600 mt-6 hover:underline"
      >
        ← Back to Home
      </button>
    </main>
  )
}
