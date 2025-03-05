import { useQuery } from "@tanstack/react-query";
import { searchCafes } from "../../services/kakao";
import useCafeStore from "../../stores/useCafeStore";

const useGetCafes = (lat, lng) => {
  const { setCafes } = useCafeStore();

  return useQuery({
    queryKey: ["cafes", lat, lng],
    queryFn: async () => {
      const cafes = await searchCafes(lat, lng);
      setCafes(cafes);
      return cafes;
    },
    enabled: !!lat && !!lng, // 위치 정보가 있을 때만 실행
    staleTime: 1000 * 60 * 5 // 5분 동안 캐싱 유지
  });
};

export default useGetCafes;




// 위치 정보없이 전국 카페를 검색하는 기능
export async function getAllCafes({pageParam = 1}) {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error("카카오 지도 API가 로드되지 않았습니다.");
  }
  // 아 이게 함수만 한 거라서 다른 파일.jsx파일에서 이 함수를 불러오니까 여기함수 내에서 쓴 console.log가 안 뜨더라고요.. 함수에서 에러가 난 건지 확실히 잘 모르겠는데 잠깐마요
  const { kakao } = window;

  return new Promise((resolve, reject) => {
    const ps = new kakao.maps.services.Places();

    // 카테고리로 카페를 검색
    try {
      ps.categorySearch("CE7", (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 페이지네이션 정보와 함께 반환
          resolve({
            results: data,
            page: pagination.current,
            total_pages: pagination.totalPages
          });
        }
        // 페이지네이션 처리
        if (pagination.hasNext) {
          pagination.gotoPage(pageParam); // 페이지 번호에 맞는 페이지로 이동
        } else {
          reject(new Error("검색 실패"));
        }
      });
    } catch (error) {
      console.log("에러가 떴어요....", error);
    }
  });
}


// 주하님께서 알려주신 코드
// import { useQuery } from "@tanstack/react-query";

// const searchCafes = async (query) => {
//   return new Promise((resolve, reject) => {
//     if (!window.kakao || !window.kakao.maps) {
//       reject(new Error("카카오 지도 API가 로드되지 않았습니다."));
//       return;
//     }

//     const places = new window.kakao.maps.services.Places();

//     places.keywordSearch(query, (data, status) => {
//       if (status === window.kakao.maps.services.Status.OK) {
//         resolve(data);
//       } else {
//         reject(new Error("카페 검색 실패"));
//       }
//     });
//   });
// };

// export const useSearchCafes = (query) => {
//   return useQuery({
//     queryKey: ["searchCafes", query], // 검색어별 캐싱
//     queryFn: () => searchCafes(query),
//     enabled: !!query, // 검색어가 있을 때만 실행
//     staleTime: 1000 * 60 * 5, // 5분 캐싱
//   });
// };