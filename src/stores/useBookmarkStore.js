import { create } from "zustand";
import supabase from "../services/supabase";

const useBookmarkStore = create((set) => ({
  isBookmarked: false,

  // ✅ 북마크 여부 확인
  checkBookmark: async (users_uid, cafe_id) => {
    if (!users_uid || !cafe_id) return;

    const { data, error } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("users_uid", users_uid)
      .eq("cafe_id", cafe_id);

    if (error) {
      console.error("북마크 조회 실패:", error);
      return;
    }

    set({ isBookmarked: data.length > 0 });
  },

  // ✅ 북마크 추가 & 삭제 (토글)
  toggleBookmark: async (users_uid, cafe) => {
    if (!users_uid || !cafe?.id) {
      alert("로그인이 필요합니다!");
      return;
    }

    const { id: cafe_id, place_name, road_address_name, address_name, phone } = cafe;
    const { isBookmarked } = useBookmarkStore.getState();

    if (isBookmarked) {
      // 북마크 삭제
      const { error } = await supabase.from("bookmarks").delete().eq("users_uid", users_uid).eq("cafe_id", cafe_id);

      if (error) {
        console.error("북마크 삭제 실패:", error);
        return;
      }
      set({ isBookmarked: false });
    } else {
      // 북마크 추가
      const { error } = await supabase
        .from("bookmarks")
        .insert([{ users_uid, cafe_id, place_name, road_address_name, address_name, phone }]);

      if (error) {
        console.error("북마크 추가 실패:", error);
        return;
      }
      set({ isBookmarked: true });
    }
  }
}));

export default useBookmarkStore;
