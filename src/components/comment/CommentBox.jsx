import useCommentStore from "../../stores/useCommentStore";
import ContentBox from "../common/ContentBox";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { useGetCommentsQuery } from "../../tanstack/queries/useGetCommentsQuery";
import useCafeStore from "../../stores/useCafeStore";
import { useEffect } from "react";

const CommentBox = () => {
  const { commentArr, setComments } = useCommentStore();
  const { data } = useGetCommentsQuery();
  const { selectedCafe } = useCafeStore();

  useEffect(() => {
    if (data) {
      const filteredComments = data.filter((comment) => comment.cafe_id == selectedCafe.id);
      setComments(filteredComments);
      console.log("filtered", filteredComments);
    }
  }, [data, selectedCafe.id, setComments]);

  return (
    <ContentBox className="flex flex-col justify-between h-full w-[400px] bg-lightgray">
      <div className="flex flex-col w-full overflow-auto max-h-full gap-[16px]">
        {commentArr?.map((comment) => {
          return (
            <Comment
              key={comment.id}
              id={comment.id}
              user_uid={comment.user_uid}
              nickname={comment.nickname}
              comment={comment.comments}
            />
          );
        })}
      </div>
      <CommentInput />
    </ContentBox>
  );
};

export default CommentBox;
