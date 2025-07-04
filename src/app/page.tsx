'use client'

import DishCard from '@/components/user/DishCard'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Dish = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  available: boolean  
}

export default function HomePage() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/dishes', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setDishes(data))
  }, [])

  const availableDishes = dishes.filter((d) => d.available)
  const unavailableDishes = dishes.filter((d) => !d.available)

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={() => router.push('/admin/login')}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Admin
        </button>
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/cart')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Cart
        </button>
      </div>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Menu List</h1>

        {/* Available Dishes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Available Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableDishes.map((dish) => (
              <DishCard key={dish.id} {...dish} />
            ))}
          </div>
        </section>

        {/* Unavailable Dishes */}
        {unavailableDishes.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2 text-gray-500">Unavailable</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 opacity-50">
              {unavailableDishes.map((dish) => (
                <DishCard key={dish.id} {...dish} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
