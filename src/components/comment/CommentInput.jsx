import { useRef } from "react";
import useCafeStore from "../../stores/useCafeStore";
import useUserStore from "../../stores/useUserStore";
import { useCreateCommentMutation } from "../../tanstack/mutations/useCommentsMutation";
import Icon from "../common/Icon";
import useCommentStore from "../../stores/useCommentStore";

const CommentInput = () => {
  const { mutate: addComment } = useCreateCommentMutation();
  const { selectedCafe } = useCafeStore();
  const { userData } = useUserStore();
  const inputRef = useRef(null);
  const { createStoreComment } = useCommentStore();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    addComment({
      cafe_id: selectedCafe.id,
      cafe_name: selectedCafe.place_name,
      comments: inputRef.current.value,
      user_uid: userData.id,
      nickname: userData.user_metadata.nickname
    });
    
    createStoreComment({
      cafe_id: selectedCafe.id,
      cafe_name: selectedCafe.place_name,
      comments: inputRef.current.value,
      user_uid: userData.id,
      nickname: userData.user_metadata.nickname
    });

    inputRef.current.value = "";
  };

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} className="w-full flex items-center gap-[12px]">
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        name="comment"
        className="w-full h-[50px] px-[20px] rounded-full"
        ref={inputRef}
      />
      <button>
        <Icon icon="send" />
      </button>
    </form>
  );
};

export default CommentInput;
