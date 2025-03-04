import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"], // 쿼리 키는 배열 형태로 전달
    queryFn: async () => {
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        throw new Error("로그인된 사용자를 가져오는 데 실패했습니다.");
      }

      const userId = authUser.user.id;
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("nickname, mbti, gender, email")
        .eq("users_uid", userId)
        .single();

      if (userError) {
        throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
      }

      return userData; // 반환할 데이터
    }
  });
};
