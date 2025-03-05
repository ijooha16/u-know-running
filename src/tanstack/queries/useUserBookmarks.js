import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export function useUserBookmarks(userId) {
  return useQuery({
    queryKey: ["userBookmarks", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookmarks").select("*").eq("users_uid", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId // userId가 있을 때만 쿼리 실행
  });
}
