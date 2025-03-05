export const fetchNaverImage = async (place_name) => {
  try {
    const response = await fetch(`/api/naver-image?query=${place_name}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data?.items;
    }
    return null;
  } catch (error) {
    console.error("네이버 이미지 가져오기 실패:", error);
    return null;
  }
};

// 1. naver api 요청할때 query stirng 에서 0 번째를 요청 할 수 있느지 ? query = {name } 여기서 더 추가가 되는지를 확인
// ** 일단 useGetImage로 사용 전환해 보고, 추가 검토하기로 함.

// 2. useNaverImage를 개선하는데 이걸 useQuery를 이용해서 queryKey , retry, staleTIme을 이용해서 중복되는 요청 막기를 해보는것으로
// ** answer : staleTime, retry 설정 추가 및 refetchOnWindowFocus 및 refetchOnMount 조치 취함
