import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    immer((set) => ({
      userData: null,
      isEdit: false, // 수정 모드 상태
      setUserData: (data) => set({ userData: data }),
      setIsEdit: (editState) => set({ isEdit: editState }), // 수정 모드 상태를 설정
      toggleEdit: () => set((state) => ({ isEdit: !state.isEdit })) // 수정 모드를 토글
    })),
    { name: "user-data" }
  )
);

export default useUserStore;
