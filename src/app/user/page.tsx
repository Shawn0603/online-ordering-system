'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DishCard from '@/components/user/DishCard'

type Dish = {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  available: boolean
}

export default function UserHomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string | null>(null)
  const [availableDishes, setAvailableDishes] = useState<Dish[]>([])
  const [unavailableDishes, setUnavailableDishes] = useState<Dish[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.name || 'User')
    } else {
      router.push('/login')
    }

    fetch('/api/dishes', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: Dish[]) => {
        const available = data.filter((dish) => dish.available)
        const unavailable = data.filter((dish) => !dish.available)
        setAvailableDishes(available)
        setUnavailableDishes(unavailable)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="relative">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="font-bold text-xl">Welcome, {userName}</div>
        <div className="space-x-2">
          <button
            onClick={() => router.push('/cart')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Cart
          </button>
          <button
            onClick={() => router.push('/history-orders')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            History Orders
          </button>
          <button
            onClick={() => alert('Coming soon: profile page')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {availableDishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.imageUrl}
              available={dish.available}
            />
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Unavailable Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-400">
          {unavailableDishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.imageUrl}
              available={dish.available}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
