import { create } from "zustand";

interface StockStore {
  price: number;
  setPrice: (price: number) => void;
}

export const useStockStore = create<StockStore>((set, get) => ({
  price: 0,
  setPrice: (price?: number) => {
    set({ price: price ?? 0 });
  },
}));
