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
  const [newName, setNewName] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const router = useRouter()

  const fetchDishes = async () => {
    const res = await fetch('/api/admin/menu')
    const data = await res.json()
    setDishes(data)
  }

  useEffect(() => {
    fetchDishes()
  }, [])

  const handleToggle = async (id: string) => {
    await fetch(`/api/dishes/${id}/toggle-availability`, {
      method: 'PATCH',
    })
    await fetchDishes()
  }

  const handleUpdatePrice = async (id: string, newPrice: number) => {
    await fetch(`/api/admin/menu/update-price`, {
      method: 'PATCH',
      body: JSON.stringify({ id, price: newPrice }),
      headers: { 'Content-Type': 'application/json' },
    })
    await fetchDishes()
  }

  const handleAddDish = async () => {
    if (!newName || !newPrice) return
    await fetch(`/api/admin/menu/create`, {
      method: 'POST',
      body: JSON.stringify({ name: newName, price: parseFloat(newPrice) }),
      headers: { 'Content-Type': 'application/json' },
    })
    setNewName('')
    setNewPrice('')
    await fetchDishes()
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Menu</h1>
        <button
          onClick={() => router.push('/admin')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      <ul className="space-y-4 mb-8">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{dish.name}</span>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-24"
                  defaultValue={dish.price}
                  onBlur={(e) =>
                    handleUpdatePrice(dish.id, parseFloat(e.target.value))
                  }
                />
                <span className="text-sm text-gray-500">
                  {dish.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleToggle(dish.id)}
              className={`px-4 py-2 rounded text-white ${
                dish.available ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {dish.available ? 'Take Down' : 'Put Back'}
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-2">Add New Dish</h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Dish Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded px-3 py-2 w-1/3"
          />
          <input
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            className="border rounded px-3 py-2 w-1/4"
          />
          <button
            onClick={handleAddDish}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Dish
          </button>
        </div>
      </div>
    </main>
  )
}
