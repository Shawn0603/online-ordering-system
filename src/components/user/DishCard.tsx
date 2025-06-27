'use client';

import { useCartStore } from '@/store/useCartStore';

type DishCardProps = {
  id: string; 
  name: string;
  description: string;
  price: number;
  image?: string;
};

export default function DishCard({ id, name, description, price, image }: DishCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {image && <img src={image} alt={name} className="w-full h-40 object-cover mb-2 rounded-md" />}
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-2 text-blue-600 font-bold">${price.toFixed(2)}</p>

      <button
        onClick={() => addToCart({ dishId: id, name, price })}

        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
