import supabase from "./supabase";

export const upsertTag = async ({ user_uid, tag_type, cafe_id }) => {
  // tag_types 배열을 개별 `tag_type` 값으로 저장 (JSON이 아닌 TEXT)
  const { data, error } = await supabase
    .from("tags")
    .upsert([{ user_uid, cafe_id, tag_type }], { onConflict: ["user_uid", "cafe_id"] }); // 기존 row 있으면 tag_type 업데이트

  if (error) {
    console.error("태그 추가/업데이트 실패:", error);
    throw error;
  }

  console.log("태그 추가/업데이트 성공:", data);
  return data;
};

export const getTagsByCafeId = async (cafe_id) => {
  const { data, error } = await supabase.from("tags").select("*").eq("cafe_id", cafe_id); // `cafe_id`가 특정 값과 같은 데이터만 가져오기

  if (error) {
    console.error("태그 조회 실패:", error);
    throw error;
  }

  return data;
};
