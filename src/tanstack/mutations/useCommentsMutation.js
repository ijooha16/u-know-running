import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { QUERY_KEYS } from "../query.keys";
import { ErrorMessage, SuccessMessage } from "../../data/toastMessages";
import { queryClient } from "../queryClient";
import { createComment, deleteComment, updateComment } from "../../services/comments";
import useCommentStore from "../../stores/useCommentStore";

//댓글 넣기
export const useCreateCommentMutation = () => {
  const { createStoreComment } = useCommentStore();

  return useMutation({
    mutationFn: ({ cafe_id, cafe_name, comments, user_uid, nickname }) =>
      createComment({ cafe_id, cafe_name, comments, user_uid, nickname }),
    onSuccess: (data) => {
      console.log(data[0], "댓글 추가 성공");
      queryClient.setQueryData(QUERY_KEYS.COMMENTS, (old) => [...old, data[0]]);
      createStoreComment(data[0])
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success(SuccessMessage.createComment);
    }
  });
};

//댓글 수정
export const useUpdateCommentMutation = () => {
  const { updateStoreComment } = useCommentStore();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      console.log("수정", data);
      toast.success(SuccessMessage.editComment);
      queryClient.setQueryData(QUERY_KEYS.COMMENTS, (old) => {
        return old?.map((item) => (item.id === data[0].id ? { ...item, comments: data[0].comments } : item));
      });
      updateStoreComment({ id: data[0].id, newText: data[0].comments });
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
  const { removeComment } = useCommentStore();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      console.log(data, "삭제 성공");
      toast.success(SuccessMessage.deleteComment);
      removeComment(data);
      queryClient.setQueryData(QUERY_KEYS.COMMENTS, (old) => [old?.filter((old) => old.id !== data)]);
      queryClient.invalidateQueries(QUERY_KEYS.COMMENTS);
    },
    onError: (error) => {
      console.log(error);
      toast.error(ErrorMessage.deleteComment);
    }
  });
};
