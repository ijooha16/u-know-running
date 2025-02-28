// import useCafeStore from "../stores/useCafeStore";
import Icon from "./common/Icon";
import MainTag from "./common/MainTag";

const CafeCard = () => {
  // const { selectedCafe } = useCafeStore();
  // const { place_name, road_address_name, address_name, phone, place_url } = selectedCafe;
  const place_name = "컴포즈 커피 부천점";
  const address_name = "여월동 사단지 어쩌고 길주로";
  const road_address_name = "d";

  return (
    <div className="shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-full w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]">
      <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
        <div className="flex justify-between w-full items-center pr-[12px]">
          <MainTag tagText="혼자 공부하기 좋은" />
          <Icon icon="bookMark" />
        </div>
        <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
        <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
      </div>
    </div>
  );
};

export default CafeCard;