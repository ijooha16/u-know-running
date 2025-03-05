export const fetchOGImage = async (url) => {
  try {
    const response = await fetch(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${import.meta.env.VITE_OG_IMAGE_KEY}`
    );
    const data = await response.json();
    console.log("이미지데이터확인", data);
    return data.hybridGraph.image; //OG 이미지 URL 반환
  } catch (error) {
    console.error("OG 이미지 가져오기 실패:", error);
    return null;
  }
};
