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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
        <div className="font-bold text-xl text-gray-800">
          Welcome, {userName}
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Cart', onClick: () => router.push('/cart') },
            { label: 'History Orders', onClick: () => router.push('/history-orders') },
            { label: 'Profile', onClick: () => alert('Coming soon: profile page') },
            { label: 'Logout', onClick: handleLogout },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg shadow-md border border-amber-600 hover:bg-amber-600 active:scale-95 transition transform duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Available Dishes */}
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Available Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
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

          {/* Unavailable Dishes */}
          {unavailableDishes.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-gray-500">Unavailable Dishes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 opacity-50">
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
            </>
          )}
        </div>
      </main>
    </div>
  )
}
