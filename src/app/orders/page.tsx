'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type OrderedItem = {
  name: string
  quantity: number
  price: number
}

export default function OrderSuccessPage() {
  const [orderItems, setOrderItems] = useState<OrderedItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedItems = localStorage.getItem('latestOrder')
    if (savedItems) {
      setOrderItems(JSON.parse(savedItems))
      localStorage.removeItem('latestOrder') 
    }
  }, [])

  const getTotal = () =>
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Order is successful</h1>
      <p className="mb-6 text-gray-700">Thank you for your order! Here are the details of your order:</p>

      {orderItems.length > 0 ? (
        <div className="border rounded-lg p-4 shadow">
          <ul className="divide-y">
            {orderItems.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-semibold">
            Total: ${getTotal()}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">Order content not found.</p>
      )}

      <button
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => router.push('/')}
      >
        Return to Home Page
      </button>
    </div>
  )
}
