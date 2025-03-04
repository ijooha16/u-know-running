import { useQuery } from "@tanstack/react-query";
import { fetchNaverImage } from "../../services/naverimage";

export function useGetImage(place_name) {
  return useQuery({
    queryKey: ["naverImages", place_name],
    queryFn: () => fetchNaverImage(place_name),
    staleTime: 1000 * 60 * 5, // 5분
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
