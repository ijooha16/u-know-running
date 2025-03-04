import Icon from "../common/Icon";

const CommentInput = ({ value, onChange }) => {
  return (
    <form className="w-full flex items-center gap-[12px]">
      <input
        type="text"
        onChange={onChange}
        placeholder="댓글을 입력해주세요"
        value={value}
        className="w-full h-[50px] px-[20px] rounded-full"
      />
      <Icon icon='send'/>
    </form>
  );
};

export default CommentInput;
