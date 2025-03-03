import { getTagsByCafeId } from "../../services/tags";
import { useQuery } from "@tanstack/react-query";
import useCafeStore from "../../stores/useCafeStore";

export const useGesCafeTagQuery = () => {
  const { selectedCafe } = useCafeStore();

  return useQuery({ queryKey: ["cafeTag"], queryFn: () => getTagsByCafeId(selectedCafe.id) });
};
