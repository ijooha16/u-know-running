import { toast } from 'react-toastify';

export const searchCafes = async (lat, lng, radius = 3000) => {
  try {
    if (!window.kakao || !window.kakao.maps) {
      throw new Error("카카오 지도 API가 로드되지 않았습니다.");
    }

    const places = new window.kakao.maps.services.Places();

    return new Promise((resolve, reject) => {
      places.categorySearch(
        "CE7", // 카페 카테고리 코드
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(data);
          } else {
            reject(new Error("카페 검색 실패"));
          }
        },
        {
          location: new window.kakao.maps.LatLng(lat, lng),
          radius, // 반경 설정 (기본: 3km)
        }
      );
    });
  } catch (error) {
    console.error("카페 검색 중 오류 발생:", error);
    toast.error("카페 검색 중 오류 발생");
    throw error;
  }
};