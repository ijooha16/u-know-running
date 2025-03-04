import supabase from "./supabase";

// 마이페이지 내에서 사용할 태그 불러오기
export async function getUserTopTags(userId) {
  // userId에 해당하는 유저의 "tags" 테이블에서 "tag_type" 컬럼만 조회
  const { data, error } = await supabase.from("tags").select("tag_type").eq("user_uid", userId);

  if (error) {
    throw error;
  }

  // 태그별 클릭 수 집계
  const tagCounts = {};
  data.forEach((record) => {
    const tag = record.tag_type;
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  // 객체를 배열로 변환 후 클릭수 기준 내림차순 정렬
  const sortedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  // 상위 4개 태그 반환
  return sortedTags.slice(0, 4);
}

// 카페 모달창에서 사용할 태그 불러오기
export async function getCafeTopTags(cafe_id) {
  //"tags" 테이블에서 "cafe_id"를 기준으로 "tag_type" 컬럼만 조회
  const { data, error } = await supabase.from("tags").select("tag_type").eq("cafe_id", cafe_id);

  if (error) {
    throw error;
  }
  // 태그별 클릭 수 집계
  const tagCounts = {};
  data.forEach((record) => {
    const tag = record.tag_type;
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  // 객체를 배열로 변환 후 클릭수 기준 내림차순 정렬
  const sortedTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  // 상위 4개 태그 반환
  return sortedTags.slice(0, 4);
}
