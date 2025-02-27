const MainTag = ({ tagText }) => {
  return (
    <div className="flex items-center h-[40px] px-[16px] bg-[#adb5b3] text-white font-medium text-darkgray rounded-full">
      {tagText}
    </div>
  );
};

export default MainTag;
