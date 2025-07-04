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
  const [returnPath, setReturnPath] = useState('/')
  const router = useRouter()

  useEffect(() => {
    const savedItems = localStorage.getItem('latestOrder')
    if (savedItems) {
      setOrderItems(JSON.parse(savedItems))
      localStorage.removeItem('latestOrder')
    }

    const user = localStorage.getItem('user')
    if (user) {
      setReturnPath('/user')
    } else {
      setReturnPath('/')
    }
  }, [])

  const getTotal = () =>
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Order Successful</h1>
        <p className="mb-6 text-gray-700 text-center">
          Thank you for your order! Here are the details of your purchase:
        </p>

        {orderItems.length > 0 ? (
          <div className="border rounded-lg p-4 shadow-sm">
            <ul className="divide-y">
              {orderItems.map((item, index) => (
                <li key={index} className="py-2 flex justify-between text-gray-700">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right font-semibold text-gray-800">
              Total: ${getTotal()}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">Order content not found.</p>
        )}

        <div className="flex justify-center mt-8">
          <button
            className="bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md border border-amber-600 hover:bg-amber-600 active:scale-95 transition transform duration-150"
            onClick={() => router.push(returnPath)}
          >
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  )
}
