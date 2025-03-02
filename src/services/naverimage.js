// ogimage 대체 - 사유: ogimage로 불러올 수 있는 이미지가 지도로 한정됨.
export const fetchNaverImage = async (place_name) => {
  try {
    const response = await fetch(`/api/naver-image?query=${place_name}`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].thumbnail;
    }
    return null;
  } catch (error) {
    console.error("네이버 이미지 가져오기 실패:", error);
    return null;
  }
};
