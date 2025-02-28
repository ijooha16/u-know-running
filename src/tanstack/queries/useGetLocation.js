import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../../services/location";

const useGetLocation = () => {
  return useQuery({
    queryKey: ["userLocation"],
    queryFn: getLocation,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
    retry: false // 위치 가져오기에 실패하면 재시도 안 함
  });
};

export default useGetLocation;
