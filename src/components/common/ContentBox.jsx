const ContentBox = ({ children, className }) => {
  return (
    <div className={`bg-[#eeeeee] flex flex-col items-center gap-[16px] w-[300px] flex flex-col p-[20px_16px] rounded-[30px] ${className}`}>
      {children}
    </div>
  );
};

export default ContentBox;
