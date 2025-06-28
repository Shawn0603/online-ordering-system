'use client'

import { useCartStore } from '@/store/useCartStore'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const router = useRouter()

  const getUserId = () => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored).id : undefined
  }

  // ✅ 修改后的 handlePlaceOrder，不再调用后端 API
  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert('Cart is empty!')
      return
    }

    alert('Dishes added. You can continue ordering.')
  }

  const handlePay = async () => {
    if (items.length === 0) {
      alert('Cart is empty!')
      return
    }

    const userId = getUserId()

    const payload = {
      userId,
      items: items.map((item) => ({
        dishId: item.dishId,
        quantity: item.quantity,
      })),
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        localStorage.setItem(
          'latestOrder',
          JSON.stringify(
            items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            }))
          )
        )
        clearCart()
        router.push('/orders')
      } else {
        alert('Checkout failed. Please try again.')
      }
    } catch (err) {
      console.error(err)
      alert('Checkout failed. Please try again later.')
    }
  }

  return (
    <>
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
        >
          Back
        </button>
      </div>

      <main className="max-w-3xl mx-auto p-6 pt-0">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.dishId} className="border p-4 rounded shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="font-bold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total: <span className="text-blue-700">${total.toFixed(2)}</span>
              </p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handlePlaceOrder}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Place Order
                </button>
                <button
                  onClick={handlePay}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Pay
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}
