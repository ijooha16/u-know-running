import useCafeStore from "../stores/useCafeStore";
import ContentLayout from "./layout/ContentLayout";

const Modal = ({ children }) => {
  const { setSelectedCafe } = useCafeStore();

  return (
    <div
      onClick={() => setSelectedCafe(null)}
      className="z-50 fixed flex justify-center top-0 left-0 w-screen h-screen bg-[#000000a8]"
    >
      <ContentLayout>
        <div
          className="bg-white flex flex-col items-center gap-[16px] p-[30px] rounded-[30px]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </ContentLayout>
    </div>
  );
};

export default Modal;
