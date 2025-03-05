import { useState } from "react";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../../tanstack/mutations/useCommentsMutation";
import Icon from "../common/Icon";
import useUserStore from "../../stores/useUserStore";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../data/toastMessages";

const Comment = ({ nickname, comment, id, user_uid }) => {
  const { mutate: deleteComment } = useDeleteCommentMutation();
  const { mutate: editComment } = useUpdateCommentMutation();
  const [newComment, setNewComment] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const { userData } = useUserStore();

  return (
    <div className="w-full flex flex-col bg-white p-[16px] gap-[10px] rounded-[20px]">
      <div className="flex justify-between items-center">
        <div className="text-darkgray font-bold">{nickname}userId 님</div>
        {userData.user_metadata.sub === user_uid && (
          <div className="flex gap-[6px]">
            <Icon icon="edit" onClick={() => setShowInput(true)} small={true} className="cursor-pointer" />
            <Icon
              icon="delete"
              onClick={() => {
                deleteComment(id);
              }}
              small={true}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      {showInput ? (
        <div className="flex gap-6">
          <input type="text" defaultValue={comment} onChange={(e) => setNewComment(e.target.value)} />
          <div
            onClick={() => {
              if (!newComment) {
                toast.error(ErrorMessage.requireComment);
                return;
              }
              editComment({ id, comments: newComment });
              setShowInput(false);
            }}
            className="text-darkgray w-[100px] cursor-pointer"
          >
            수정
          </div>
        </div>
      ) : (
        <div>{comment}</div>
      )}
    </div>
  );
};

export default Comment;
