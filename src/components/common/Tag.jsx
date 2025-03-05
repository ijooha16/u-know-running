const Tag = ({ tagText, onClick, isSelected, className }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-[16px] text-[14px] h-[40px] bg-lightgray rounded-full ${className} ${
        isSelected ? "bg-primary text-white scale-125" : "bg-lightgray text-darkgray"
      }`}
    >
      # {tagText}
    </div>
  );
};

export default Tag;
