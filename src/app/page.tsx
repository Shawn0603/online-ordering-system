"use client";

import DishCard from "@/components/user/DishCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  available: boolean;
};

export default function HomePage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dishes", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setDishes(data));
  }, []);

  const availableDishes = dishes.filter((d) => d.available);
  const unavailableDishes = dishes.filter((d) => !d.available);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-100 relative">
      {/* Top-right buttons */}
      <div className="absolute top-4 right-4 flex gap-4">
        {[
          { label: "Admin", path: "/admin/login" },
          { label: "Login", path: "/login" },
          { label: "Cart", path: "/cart" },
        ].map(({ label, path }) => (
          <button
            key={label}
            onClick={() => router.push(path)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg shadow-md border border-amber-600 hover:bg-amber-600 active:scale-95 transition transform duration-150"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Our Menu
          </h1>

          {/* Available Dishes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3 text-green-700">
              Available Dishes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {availableDishes.map((dish) => (
                <DishCard key={dish.id} {...dish} />
              ))}
            </div>
          </section>

          {/* Unavailable Dishes */}
          {unavailableDishes.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-500">
                Unavailable
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 opacity-50">
                {unavailableDishes.map((dish) => (
                  <DishCard key={dish.id} {...dish} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
