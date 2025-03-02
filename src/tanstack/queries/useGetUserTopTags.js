import { useQuery } from "@tanstack/react-query";
import getUserTopTags from "../../services/mypageTag";

export function useGetUserTopTags(userId) {
  return useQuery({
    queryKey: ["topTags", userId],
    queryFn: () => getUserTopTags(userId)
  });
}
