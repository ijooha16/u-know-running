import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertTag } from "../../services/tags"; // API 함수 가져오기

const useUpsertTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertTag,
    onSuccess: () => {
      console.log("태그가 성공적으로 추가/업데이트됨!");
      queryClient.invalidateQueries(["tags"]); // 태그 목록 갱신
    },
    onError: (error) => {
      console.error("태그 추가/업데이트 실패:", error);
    }
  });
};

export default useUpsertTagMutation;
