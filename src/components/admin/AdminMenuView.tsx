'use client'

import { useEffect, useState } from 'react'

type Dish = {
  id: string
  name: string
  price: number
  available: boolean
}

export default function AdminMenuView() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(false)

  // Load dishes from API
  const fetchDishes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/dishes')
      const data = await res.json()
      setDishes(data)
    } catch (err) {
      console.error('Failed to fetch dishes', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDishes()
  }, [])

  // Toggle availability of a dish
  const toggleAvailability = async (id: string) => {
    try {
      const res = await fetch(`/api/dishes/${id}/toggle-availability`, {
        method: 'PATCH',
      })
      if (res.ok) {
        fetchDishes() // Refresh after update
      } else {
        console.error('Failed to toggle availability')
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dish Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <p className="font-semibold">{dish.name}</p>
                <p className="text-gray-600">${dish.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => toggleAvailability(dish.id)}
                className={`px-4 py-2 rounded text-white ${
                  dish.available ? 'bg-red-500' : 'bg-green-600'
                }`}
              >
                {dish.available ? 'Take it down' : 'Put it back'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
