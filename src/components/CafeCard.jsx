import Icon from "./common/Icon";
import { useGetImage } from "../tanstack/queries/useGetImage";
import { useToggleBookmark } from "../tanstack/mutations/useBookmarksMutation";
import useUserStore from "../stores/useUserStore";
import { toast } from "react-toastify";

const CafeCard = ({ cafe }) => {
  // 받아온걸로 데이터 추출
  const { cafe_id, place_name, road_address_name, address_name, phone, place_url } = cafe;
  const { userData } = useUserStore();

  const isBookmarked = true;

  const { mutate: toggleBookmark, isLoading: isBookmarkedLoading, error: bookmarkError } = useToggleBookmark();

  // 네이버 이미지
  const { data: naverImage, isLoading: imageLoading, error: imageError } = useGetImage(place_name);
  const image = naverImage && naverImage[0].thumbnail;

  const handleBookmarkToggle = () => {
    const bookmarkData = {
      users_uid: userData.id,
      cafe_id,
      place_name,
      road_address_name,
      address_name,
      phone,
      place_url,
      isBookmarked
    };
    toggleBookmark(bookmarkData, {
      onSuccess: () => {
        if (isBookmarked) {
          toast.success("북마크가 해제되었습니다.");
        } else {
          toast.success("북마크가 등록되었습니다.");
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error("북마크 변경에 오류가 있습니다. 다시 시도해 주세요.");
      }
    });
  };

  if (imageLoading) return <div>이미지 불러오는 중..</div>;
  if (imageError) return <div>이미지 불러오기 실패</div>;

  if (isBookmarkedLoading) return <div>북마크 불러오는 중..</div>;
  if (bookmarkError) return <div>북마크 불러오기 실패</div>;

  return (
    <div className={`shadow h-[400px]] w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]`}>
      <div
        key={cafe_id}
        className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] h-full w-full flex flex-col justify-start items-start p-[20px_16px] rounded-[20px]"
      >
        <img src={image} className="w-[268px] h-[268px] object-cover" />
        <div className="flex justify-between w-full items-center pr-[12px]">
          <Icon
            icon={isBookmarked ? "bookMark" : "bookMark_empty"}
            onClick={handleBookmarkToggle}
            className="cursor-pointer"
          />
        </div>
        <div className="z-0 font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
        <div className="z-0 text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
      </div>
    </div>
  );
};

export default CafeCard;
