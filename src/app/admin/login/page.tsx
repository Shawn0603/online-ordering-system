'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Dish = {
  id: string
  name: string
  price: number
  available: boolean
}

export default function AdminMenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const router = useRouter()

  // 获取所有菜品
  const fetchDishes = async () => {
    const res = await fetch('/api/admin/menu')
    const data = await res.json()
    setDishes(data)
  }

  useEffect(() => {
    fetchDishes()
  }, [])

  // 切换上/下架状态
  const toggleAvailability = async (id: string) => {
    setLoading(true)
    await fetch(`/api/dishes/${id}/toggle-availability`, {
      method: 'PATCH',
    })
    await fetchDishes()
    setLoading(false)
  }

  // 添加新菜品
  const handleAddDish = async () => {
    if (!newName || !newPrice) return
    setLoading(true)
    await fetch('/api/admin/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
    })
    setNewName('')
    setNewPrice('')
    await fetchDishes()
    setLoading(false)
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* 顶部导航 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => router.push('/admin')}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back
        </button>
      </div>

      {/* 添加新菜品 */}
      <div className="mb-8 space-x-2">
        <input
          type="text"
          placeholder="New dish name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleAddDish}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* 菜品列表 */}
      <ul className="space-y-4">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{dish.name}</h2>
              <p className="text-sm text-gray-600">${dish.price.toFixed(2)}</p>
              {!dish.available && (
                <span className="text-red-500 text-xs">Unavailable</span>
              )}
            </div>
            <button
              disabled={loading}
              onClick={() => toggleAvailability(dish.id)}
              className={`px-4 py-2 rounded text-white ${
                dish.available ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {dish.available ? 'Take Down' : 'Put Back'}
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
