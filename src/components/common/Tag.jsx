const Tag = ({ tagText, onClick, isSelected, className }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-[16px] bg-lightgray rounded-full ${className} ${
        isSelected ? "bg-primary text-white text-[18px] h-[50px]" : "bg-lightgray text-darkgray text-[14px] h-[30px]"
      }`}
    >
      # {tagText}
    </div>
  );
};

export default Tag;
