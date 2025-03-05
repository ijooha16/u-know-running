import { getTagsByCafeId } from "../../services/tags";
import { useQuery } from "@tanstack/react-query";
import useCafeStore from "../../stores/useCafeStore";
import { QUERY_KEYS } from "../query.keys";

export const useGetCafeTagQuery = () => {
  const { selectedCafe } = useCafeStore();

  return useQuery({ queryKey: QUERY_KEYS.CAFE_TAG, queryFn: () => getTagsByCafeId(selectedCafe.id) });
};
