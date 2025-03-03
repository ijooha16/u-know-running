const Tag = ({tagText, onClick, isSelected}) => {
  return <div onClick={onClick} className={`flex items-center h-[30px] px-[16px] text-[14px] text-darkgray rounded-full hover:bg-[#3838ab] ${isSelected ? "bg-[#ff9173]" : "bg-[#191971]"}`}># {tagText}</div>;
};

export default Tag;


// 내가 수정하기 전 원본 Tag 코드
// const Tag = ({tagText}) => {
//   return <div className="flex items-center h-[30px] px-[16px] bg-white text-[14px] text-darkgray rounded-full"># {tagText}</div>;
// };

// export default Tag;
