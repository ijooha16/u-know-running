const ContentBox = ({ children, className }) => {
  return (
    <div
      className={`bg-[#eeeeee] flex flex-col items-center gap-[16px] w-[400px] p-[30px_40px] rounded-[30px] ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentBox;
