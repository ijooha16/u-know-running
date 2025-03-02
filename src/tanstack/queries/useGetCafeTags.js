import { useQuery } from "@tanstack/react-query";
import { getCafeTopTags } from "../../services/tag";

export function useGetCafeTopTags(cafe_id) {
  return useQuery({
    queryKey: ["cafeTopTags", cafe_id],
    queryFn: () => getCafeTopTags(cafe_id)
  });
}
