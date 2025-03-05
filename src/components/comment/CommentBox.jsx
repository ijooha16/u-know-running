import useCafeStore from "../../stores/useCafeStore";
import { useGetCommentsQuery } from "../../tanstack/queries/useGetCommentsQuery";
import ContentBox from "../common/ContentBox";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const CommentBox = () => {
  const { selectedCafe } = useCafeStore();
  const { data: comments } = useGetCommentsQuery();
  const filteredComments = comments?.filter((comment) => comment.cafe_id == selectedCafe.id);
  
  return (
    <ContentBox className="flex flex-col justify-between h-full w-[400px] bg-lightgray">
      <div className="flex flex-col w-full overflow-auto max-h-full gap-[16px]">
        {filteredComments?.map((comment) => {
          return <Comment key={comment.id} id={comment.id} user_uid={comment.user_uid} nickname={comment.nickname} comment={comment.comments} />;
        })}
      </div>
      <CommentInput />
    </ContentBox>
  );
};

export default CommentBox;
