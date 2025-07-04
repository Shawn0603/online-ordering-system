import { create } from 'zustand';

type CartItem = {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.dishId === item.dishId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.dishId === item.dishId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }
    }),

  updateQuantity: (dishId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((i) => i.dishId !== dishId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.dishId === dishId ? { ...i, quantity } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),
}));
