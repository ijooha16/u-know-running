import Icon from "./common/Icon";
import MainTag from "./common/MainTag";
import { useGetImage } from "../tanstack/queries/useGetImage";
import useCafeStore from "../stores/useCafeStore";
import { useGetCafeTopTags } from "../tanstack/queries/useGetCafeTags";

const CafeCard = () => {
  const { selectedCafe, setSelectedCafe } = useCafeStore();
  const { id: cafe_id, place_name, road_address_name, address_name } = selectedCafe;

  // 북마크 부분 추가 후 머지하면 됨.

  const { data: naverImage, isLoading: imageLoading, error: imageError } = useGetImage();
  const image = naverImage[0].thumbnail;

  const { data: tagList, isLoading: tagLoading, error: tagError } = useGetCafeTopTags(cafe_id);

  if (imageLoading) return <div>이미지 불러오는 중..</div>;
  if (imageError) return <div>이미지 불러오기 실패</div>;

  if (tagLoading) return <div>태그 목록 불러오는 중..</div>;
  if (tagError) return <div>태그 불러오기 실패</div>;

  return (
    <div
      key={cafe_id}
      className={`shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-auto w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]`}
    >
      <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
        <img src={image} className="w-full h-full object-cover" />
        <div className="flex justify-between w-full items-center pr-[12px]">
          {tagList.length > 0 ? (
            tagList.map((tag, index) => <MainTag key={index} tagText={tag.tag} />) // 상위 4개 태그 모두 MainTag로 표시한 것임.
          ) : (
            <MainTag tagText={"아무 태그도 등록되지 않았어요."} />
          )}
          북마크 관련 함수 머지 후 수정 예정
          <Icon
            icon="bookMark"
            onClick={() => handleBookmark(cafe.id)}
            className={`${bookmarkedCafes[cafe.id] ? "text-yellow-500" : "text-white"} cursor-pointer`}
          />
        </div>
        <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
        <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
      </div>
    </div>
  );
};

export default CafeCard;
