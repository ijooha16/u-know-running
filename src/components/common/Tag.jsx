const Tag = ({ tagText, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center h-[30px] px-[16px] bg-white text-[14px] text-darkgray rounded-full"
    >
      # {tagText}
    </div>
  );
};

export default Tag;
