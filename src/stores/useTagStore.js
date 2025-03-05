import { create } from "zustand";

const useTagStore = create((set) => ({
  selectedTag: "태그를 추가해주세요!",
  myTags: [], //tags table에서 유저아이디로 가져온 후 필터링, 정렬한 거 네개 값

  setSelectedTag: (tag) => set({ selectedTag: tag })
}));

export default useTagStore;
