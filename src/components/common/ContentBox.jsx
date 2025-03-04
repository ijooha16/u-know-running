const ContentBox = ({ children, className }) => {
  return (
    <div className={`bg-lightgray flex flex-col items-center gap-[16px] w-[300px] p-[20px_16px] rounded-[30px] ${className}`}>
      {children}
    </div>
  );
};

export default ContentBox;
