import { useQuery } from "@tanstack/react-query";
import { searchCafes } from "../../services/kakao";
import useLocationStore from "../../stores/useLocationStore";

const useGetCafes = (lat, lng) => {
  const { setCafes } = useLocationStore();

  return useQuery({
    queryKey: ["cafes", lat, lng],
    queryFn: async () => {
      const cafes = await searchCafes(lat, lng);
      setCafes(cafes);
      return cafes;
    },
    enabled: !!lat && !!lng, // 위치 정보가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};

export default useGetCafes;