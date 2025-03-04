const Comment = ({nickname, comment}) => {
  return (
    <div className="w-full flex flex-col bg-white p-[16px] gap-[10px] rounded-[20px]">
      <div className="text-darkgray font-bold">{nickname}userId 님</div>
      <div>{comment}</div>
    </div>
  );
};

export default Comment;
