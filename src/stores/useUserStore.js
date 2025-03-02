import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const useUserStore = create(persist(immer((set) => ({
    userData: null,
    setUserData: (data) => set({userData: data}),
})),{name: 'user-data'}))

export default useUserStore