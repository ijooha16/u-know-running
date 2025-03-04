import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import MainTag from "../components/common/MainTag";
import MyTag from "../components/common/MyTag";
import Tag from "../components/common/Tag";
import Modal from "../components/Modal";
import useCafeStore from "../stores/useCafeStore";
import ContentLayout from "../components/layout/ContentLayout";
import { useGetCafeTopTags } from "../tanstack/queries/useGetCafeTags";
import { useGetImage } from "../tanstack/queries/useGetImage";
import useUserStore from "../stores/useUserStore";
import { useBookmarks } from "../tanstack/queries/useBookmarks";
import { useToggleBookmark } from "../tanstack/mutations/useBookmarksMutation";
import { toast } from "react-toastify";

const CafeDetail = () => {
  // 여기 useCafeStore랑 selectedCafe 위치 절대 바꾸시면 안됩니다!!!
  // cafe_id 로딩 안되면 모달창 에러뜸.
  const { selectedCafe, setSelectedCafe } = useCafeStore();
  const { id: cafe_id, place_name, road_address_name, address_name, phone, place_url } = selectedCafe;

  const { userData } = useUserStore();

  const { mutate: toggleBookmark, isLoading: isBookmarkdLoading, error: bookmarkError } = useToggleBookmark();
  const { data: bookmarkQueryData } = useBookmarks(cafe_id);
  const isBookmarked = bookmarkQueryData && bookmarkQueryData.length > 0;

  const { data: tagList, isLoading, error } = useGetCafeTopTags(cafe_id);

  const { data: naverImage, isLoading: isImageLoading, error: imageError } = useGetImage(place_name);

  const handleClick = () => {
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

  if (!selectedCafe) return null;

  if (isLoading) return <div>태그 로딩 중..</div>;
  if (error) return <div>태그 불러오기 실패</div>;

  if (isImageLoading) return <div>이미지 불러오는 중..</div>;
  if (imageError) return <div>이미지 불러오기 실패</div>;

  if (isBookmarkdLoading) return <div>북마크 불러오는 중..</div>;
  if (bookmarkError) return <div>북마크 불러오기 실패</div>;

  return (
    <div
      onClick={() => setSelectedCafe(null)}
      className="z-50 fixed flex justify-center top-0 left-0 w-screen h-screen bg-[#000000a8]"
    >
      <ContentLayout>
        <Modal>
          <div className="flex gap-[30px]">
            <div className="flex flex-wrap max-w-[500px] min-h-[320px]">
              {naverImage &&
                naverImage.map((image, idx) => {
                  if (idx >= 5) return;
                  return (
                    <img
                      key={image.link}
                      src={image.thumbnail}
                      alt=""
                      onError="this.onerror=null; this.src=''; this.style.display='none'"
                    />
                  );
                })}
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="w-[400px] flex flex-col gap-[16px] py-[16px] items-start">
                <div className="w-full flex flex-col items-start">
                  <div className="flex justify-between w-full items-center pr-[12px]">
                    <MainTag tagText={tagList[0]?.tag || "아무 태그도 등록되지 않았어요"} />
                    <Icon icon="bookMark" onClick={handleClick} />
                  </div>
                  <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name || "이름없음"}</div>
                  <div className="text-darkgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
                  <div className="text-darkgray text-[14px] pl-[12px]">{phone || "번호없음"}</div>
                </div>
                <div className="flex gap-[12px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {tagList?.map((tag, idx) => {
                    if (idx === 0) return null;
                    return <Tag key={tag.tag} tagText={`${tag.tag} - ${tag.count}`} />;
                  })}
                </div>
                <MyTag />
              </div>
              <a href={place_url} target="_blank" rel="noopener noreferrer">
                <Button text="웹사이트 바로가기" />
              </a>
            </div>
          </div>
        </Modal>
      </ContentLayout>
    </div>
  );
};

export default CafeDetail;
