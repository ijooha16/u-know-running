import { useInfiniteQuery } from "@tanstack/react-query";
import useCafeStore from "../../stores/useCafeStore";
import { UseSearchCafes } from "./useSearchCafes";

const useGetInfiniteCafes = (lat, lng) => {
  const { setCafes } = useCafeStore();

  return useInfiniteQuery({
    queryKey: ["cafes", lat, lng],
    queryFn: ({ pageParam = 1 }) => UseSearchCafes(lat, lng, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage, // 다음 페이지 번호 반환
    onSuccess: (data) => {
      const allCafes = data.pages.flatMap((page) => page.cafes);
      setCafes(allCafes);
    },
    enabled: !!lat && !!lng, // 위치 정보가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

export default useGetInfiniteCafes;
