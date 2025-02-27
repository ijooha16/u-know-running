import { create } from "zustand";

const useLocationStore = create((set) => ({
  position: { lat: 37.5665, lng: 126.978 }, // 기본 위치: 서울
  selectedCafe: null,
  cafes: [],

  setPosition: (lat, lng) => set({ position: { lat, lng } }),
  setSelectedCafe: (cafe) => set({ selectedCafe: cafe }),
  setCafes: (cafes) => set({ cafes }),
}));

export default useLocationStore;