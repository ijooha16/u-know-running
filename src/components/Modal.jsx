const Modal = ({ children }) => {
  return (
    <div className="bg-[#eeeeee] flex flex-col items-center gap-[16px] flex flex-col p-[30px_20px] rounded-[30px]">
      {children}
    </div>
  );
};

export default Modal;
