'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Dish = {
  id: string
  name: string
  description: string | null
  price: number
  available: boolean
  imageUrl: string | null
}

export default function EditDishPage() {
  const { id } = useParams()
  const router = useRouter()

  const [dish, setDish] = useState<Dish | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [available, setAvailable] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchDish = async () => {
      const res = await fetch(`/api/admin/menu/${id}`)
      const data = await res.json()
      setDish(data)
      setName(data.name)
      setDescription(data.description || '')
      setPrice(data.price.toString())
      setAvailable(data.available)
    }

    if (id) fetchDish()
  }, [id])

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('available', String(available))
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch(`/api/admin/menu/${id}`, {
      method: 'PATCH',
      body: formData,
    })

    if (res.ok) {
      alert('Dish updated!')
      router.push('/admin/menu')
    } else {
      alert('Failed to update dish.')
    }
  }

  if (!dish) return <div className="p-6">Loading...</div>

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Dish</h1>
        <button
          onClick={() => router.push('/admin/menu')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      {/* Dish Image Preview */}
      {dish.imageUrl && (
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-48 h-48 object-cover mb-4 border rounded"
        />
      )}

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Dish Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-32 border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Dish Image</label>
          <label className="inline-block bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          {imageFile && (
            <p className="mt-2 text-sm text-gray-500">{imageFile.name}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="font-medium">Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable((prev) => !prev)}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </main>
  )
}
