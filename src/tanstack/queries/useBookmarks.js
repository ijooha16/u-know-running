import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export function useBookmarks(cafe_id) {
  return useQuery({
    queryKey: ["bookmarks", cafe_id],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookmarks").select("*").eq("cafe_id", cafe_id);

      if (error) throw error;
      return data;
    }
  });
}