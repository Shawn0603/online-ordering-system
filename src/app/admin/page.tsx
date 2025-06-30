'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Order = {
  id: string
  createdAt: string
  user: { email: string }
  items: {
    id: string
    quantity: number
    dish: {
      name: string
      price: number
    }
  }[]
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders') // ✅ 删除 headers

        const data = await res.json()
        setOrders(data.orders)
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleLogout = () => {
    router.push('/admin/login') // 依然可以跳转
  }

  const handleEditMenu = () => {
    router.push('/admin/menu')
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={handleEditMenu}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Menu
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <div className="mb-2">
                <span className="font-semibold">User:</span> {order.user.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Time:</span>{' '}
                {new Date(order.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Items:</span>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.dish.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
