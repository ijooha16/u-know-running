import useCafeStore from "../../stores/useCafeStore";
import { useGetCommentsQuery } from "../../tanstack/queries/useGetCommentsQuery";
import ContentBox from "../common/ContentBox";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const CommentBox = () => {
  const { selectedCafe } = useCafeStore();
  const { data: comments } = useGetCommentsQuery();
  const filteredComments = comments?.filter((comment) => comment.cafe_id == selectedCafe.id);

  console.log('filtered', comments, filteredComments,  selectedCafe.id)
  
  return (
    <ContentBox className="flex flex-col justify-between h-full w-[300px] bg-lightgray">
      <div className="flex flex-col w-full overflow-auto max-h-full gap-[10px]">
        {/* 코멘트 맵핑해서 유저아이디, 텍스트 보내주시면 됩니다. user_id, comment */}
        {filteredComments?.map((comment) => {
          return <Comment key={comment.id} nickname={comment.nickname} comment={comment.comments} />;
        })}
      </div>
      <CommentInput />
    </ContentBox>
  );
};

export default CommentBox;
