const ContentBox = ({ children, className }) => {
  return (
    <div className="bg-[#eeeeee] flex flex-col items-center gap-[16px] w-[400px] flex flex-col p-[30px_20px] rounded-[30px]">
      {children}
    </div>
  );
};

export default ContentBox;
