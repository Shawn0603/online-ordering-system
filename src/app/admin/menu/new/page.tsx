'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddDishPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [available, setAvailable] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('available', String(available))
    if (imageFile) formData.append('image', imageFile)

    const res = await fetch('/api/admin/menu/new', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      alert('Dish created!')
      router.push('/admin/menu')
    } else {
      alert('Failed to create dish.')
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Dish</h1>
        <button
          onClick={() => router.push('/admin/menu')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

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

        {/* ✅ Custom Upload Button */}
        <div>
          <label className="block font-medium mb-1">Dish Image</label>

          <div className="flex items-center gap-4">
            <label
              htmlFor="dish-image-upload"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded cursor-pointer"
            >
              {imageFile ? 'Change Image' : 'Upload Image'}
            </label>
            {imageFile && (
              <span className="text-sm text-gray-600">{imageFile.name}</span>
            )}
          </div>

          <input
            id="dish-image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="hidden"
          />
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
          onClick={handleCreate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Dish
        </button>
      </div>
    </main>
  )
}
