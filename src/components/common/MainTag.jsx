const MainTag = ({ tagText }) => {
  return (
    <div className="flex items-center h-[40px] px-[16px] border-[3px] border-darkgray font-medium rounded-full">
      # {tagText}
    </div>
  );
};

export default MainTag;
