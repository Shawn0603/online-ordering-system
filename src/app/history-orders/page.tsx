'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type OrderItem = {
  dish: {
    name: string
    price: number
  }
  quantity: number
}

type Order = {
  id: string
  createdAt: string
  status: string
  items: OrderItem[]
}

export default function HistoryOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      setError('You are not logged in.')
      return
    }

    const user = JSON.parse(stored)
    const userId = user.id

    const fetchOrders = async () => {
      try {
        // ✅ 修正路径
        const res = await fetch(`/api/orders?userId=${userId}`)
        if (!res.ok) throw new Error('Failed to fetch orders.')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
        setError('Could not load orders.')
      }
    }

    fetchOrders()
  }, [])

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* ✅ Back Button 移到顶部 */}
      <button
        onClick={() => router.push('/user')}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Menu
      </button>

      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-6 shadow">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Order ID: {order.id}</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <ul className="divide-y">
              {order.items.map((item, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>{item.dish.name} × {item.quantity}</span>
                  <span>${(item.dish.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 text-right text-sm italic text-gray-500">
              Status: {order.status}
            </div>
          </div>
        ))
      )}
    </main>
  )
}
