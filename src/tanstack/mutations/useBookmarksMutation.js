import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabaseClient";

const addBookmark = async ({ users_uid, cafe_id, place_name, road_address_name, address_name, phone, place_url }) => {
  const { error } = await supabase.from("bookmarks").insert([
    {
      users_uid,
      cafe_id,
      place_name,
      road_address_name,
      address_name,
      phone,
      place_url
    }
  ]);
  if (error) throw error;
  return { users_uid, cafe_id, place_name, road_address_name, address_name, phone, place_url };
};

const deleteBookmark = async ({ users_uid, cafe_id }) => {
  const { error } = await supabase.from("bookmarks").delete().eq("users_uid", users_uid).eq("cafe_id", cafe_id);
  if (error) throw error;
  return { users_uid, cafe_id };
};

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookmarkData) => {
      if (bookmarkData.isBookmarked) {
        return await deleteBookmark(bookmarkData);
      } else {
        return await addBookmark(bookmarkData);
      }
    },
    //낙관적
    onMutate: async (bookmarkData) => {
      // 취소하고
      await queryClient.cancelQueries(["bookmarks", bookmarkData.cafe_id]);
      // 가져오고
      const previousData = queryClient.getQueryData(["bookmarks", bookmarkData.cafe_id]);

      // 셋쿼리
      queryClient.setQueryData(["bookmarks", bookmarkData.cafe_id], (old) =>
        bookmarkData.isBookmarked ? [] : [bookmarkData]
      );

      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["bookmarks", variables.cafe_id], context.previousData);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(["bookmarks", variables.cafe_id]);
    }
  });
}
