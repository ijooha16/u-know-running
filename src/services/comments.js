import supabase from "./supabase";
//일단 통채로 들고 왔는데 로그 보면서 필터링 할겁니다!
export const getComments = async () => {
  const { data, error } = await supabase.from("comments").select("*");
  if (error) throw error;
  return data;
};

export const createComment = async ({ cafe_id, cafe_name, comments, user_uid, nickname }) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        cafe_id,
        cafe_name,
        comments,
        user_uid,
        nickname
      }
    ])
    .select();

  if (error) throw error;
  return data;
};

export const updateComment = async ({id, comments}) => {
  const { data, error } = await supabase
    .from("comments")
    .update({
      comments
    })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
};

export const deleteComment = async (id) => {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) throw error;
  return id;
};
