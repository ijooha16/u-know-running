import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../query.keys";
import { ErrorMessage, SuccessMessage } from "../../data/toastMessages";
import { createComment, deleteComment, updateComment } from "../../services/comments";
import { useQueryClient } from "@tanstack/react-query";

//댓글 넣기
export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cafe_id, cafe_name, comments, user_uid, nickname }) =>
      createComment({ cafe_id, cafe_name, comments, user_uid, nickname }),
    onSuccess: (data) => {
      console.log(data[0], "댓글 추가 성공");
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
      toast.success(SuccessMessage.createComment);
    }
  });
};

//댓글 수정
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      console.log("수정", data);
      toast.success(SuccessMessage.editComment);
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    onError: (error) => {
      console.log(error);
      toast.error(ErrorMessage.editComment);
    }
  });
};

//댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: (data) => {
      console.log(data, "삭제 성공");
      toast.success(SuccessMessage.deleteComment);
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    onError: (error) => {
      console.log(error);
      toast.error(ErrorMessage.deleteComment);
    }
  });
};
