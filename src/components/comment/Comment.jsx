const Comment = ({user_id, comment}) => {
  return (
    <div className="w-full flex flex-col bg-white p-[16px] gap-[10px] rounded-[20px]">
      <div className="text-darkgray font-bold">{user_id}userId 님</div>
      <div>{comment}Comment</div>
    </div>
  );
};

export default Comment;
