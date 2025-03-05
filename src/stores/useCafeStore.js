import { create } from "zustand";

const useCafeStore = create((set) => ({
  selectedCafe: null,
  cafes: [],

  setSelectedCafe: (cafe) => set({ selectedCafe: cafe }),
  setCafes: (cafes) => set({ cafes })
}));

export default useCafeStore;
