import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import MainTag from "../components/common/MainTag";
import Tag from "../components/common/Tag";
import ContentLayout from "../components/layout/ContentLayout";
import Modal from "../components/Modal";

const CafeDetail = () => {
  // const {img, name, address, phone, businessHours, menu, tags} = data;

  return (
    <div className="fixed flex justify-center top-0 left-0 w-screen h-screen bg-[#000000a8]">
      <ContentLayout>
        <Modal>
          <div className="flex gap-[30px">
            <div className="bg-white w-[400px] mr-[30px]">{/* <img src={data.img} alt="카페 이미지" /> */}</div>
            <div className="flex flex-col justify-between">
              <div className="w-[400px] flex flex-col gap-[16px] py-[16px] items-end">
                <div className="w-full flex flex-col items-start">
                  <div className="flex justify-between w-full items-center pr-[12px]">
                    <MainTag tagText="혼자 공부하기 좋은" />
                    <Icon icon="bookMark" />
                  </div>
                  <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">Cafe Name</div>
                  <div className="text-darkgray text-[14px] pl-[12px]">뫄뫄시 뫄뫄동 뫄뫄뫄 뫄뫄-뫄뫄길</div>
                </div>
                <div className="flex gap-[12px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <Tag tagText="혼자 공부하기 좋은" />
                  <Tag tagText="혼자 공부하기 좋은" />
                  <Tag tagText="혼자 공부하기 좋은" />
                </div>
                <div className="w-full flex flex-end"></div> <Button text="웹사이트 바로가기" />
              </div>
            </div>
          </div>
        </Modal>
      </ContentLayout>
    </div>
  );
};

export default CafeDetail;
