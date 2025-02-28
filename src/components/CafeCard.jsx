import useCafeStore from "../stores/useCafeStore";
import ContentBox from "./common/ContentBox";
import Icon from "./common/Icon";
import MainTag from "./common/MainTag";
import Tag from "./common/Tag";

const CafeCard = () => {
  const { selectedCafe } = useCafeStore();
  //대신 데이터 넣어주기
  const { place_name, road_address_name, address_name, phone, place_url } = selectedCafe;

  return (
    <ContentBox>
      <div className="w-full flex flex-col items-start gap-[20px]">
        <div className="flex justify-between w-full items-center pr-[12px]">
          <MainTag tagText="혼자 공부하기 좋은" />
          <Icon icon="bookMark" />
        </div>
        <div className="font-semibold text-[26px] pl-[12px]">{place_name}</div>
        <img src="https://placekitten.com/200/300" alt="카페 이미지" className="w-full bg-white" />
        <div>
          <div className="text-darkgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
          <div className="text-darkgray text-[14px] pl-[12px]">{phone}</div>
        </div>
        <div className="flex gap-[12px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Tag tagText="혼자 공부하기 좋은" />
          <Tag tagText="혼자 공부하기 좋은" />
          <Tag tagText="혼자 공부하기 좋은" />
        </div>
      </div>
    </ContentBox>
  );
};

export default CafeCard;
