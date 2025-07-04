'use client';

import { useCartStore } from '@/store/useCartStore';

type DishCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  available: boolean;
};

export default function DishCard({
  id,
  name,
  description,
  price,
  imageUrl,
  available,
}: DishCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover mb-2 rounded-md"
        />
      )}
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="mt-2 text-blue-600 font-bold">${price.toFixed(2)}</p>

      <button
        onClick={() => available && addToCart({ dishId: id, name, price })}
        disabled={!available}
        className={`mt-3 px-3 py-1 rounded w-full ${
          available
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-400 text-white cursor-not-allowed'
        }`}
      >
        {available ? 'Add to Cart' : 'Unavailable'}
      </button>
    </div>
  );
}
