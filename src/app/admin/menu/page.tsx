// app/admin/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Dish = {
  id: string;
  name: string;
  price: number;
  available: boolean;
};

export default function AdminMenuPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const router = useRouter();

  const fetchDishes = async () => {
    const res = await fetch("/api/admin/menu");
    const data = await res.json();
    setDishes(data);
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleToggle = async (id: string) => {
    await fetch(`/api/dishes/${id}/toggle`, {
      method: "PATCH",
    });
    await fetchDishes();
  };

  const activeDishes = dishes.filter((d) => d.available);
  const inactiveDishes = dishes.filter((d) => !d.available);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Menu</h1>
        <button
          onClick={() => router.push("/admin")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

      {/* ➕ Add Dish */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/menu/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Add New Dish
        </button>
      </div>

      {/* 🔼 Active Dishes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Active Dishes</h2>
        <ul className="space-y-4">
          {activeDishes.map((dish) => (
            <li
              key={dish.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{dish.name}</p>
                <p className="text-sm text-gray-500">
                  ${dish.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/menu/${dish.id}`)}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(dish.id)}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Take Down
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 🔽 Inactive Dishes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Inactive Dishes</h2>
        <ul className="space-y-4">
          {inactiveDishes.map((dish) => (
            <li
              key={dish.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{dish.name}</p>
                <p className="text-sm text-gray-500">
                  ${dish.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/menu/${dish.id}`)}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(dish.id)}
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Put Back
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
