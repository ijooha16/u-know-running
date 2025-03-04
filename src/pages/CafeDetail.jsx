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
import CommentBox from "../components/comment/CommentBox";

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

  const { isLoading: isImageLoading, error: imageError } = useGetImage(place_name);

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
    <div onClick={() => setSelectedCafe(null)}>
      <ContentLayout>
        <Modal>
          <div className="h-[500px] flex gap-[30px]">
            <div className="h-full flex flex-col justify-between">
              <div className="w-auto min-w-[400px] flex flex-col items-start gap-[20px]">
                <ModalImage />
                <div className="w-full flex justify-between items-center pr-[16px]">
                  <MainTag tagText={tagList[0]?.tag || "아무 태그도 등록되지 않았어요"} />
                  <Icon icon="bookMark" onClick={handleClick} /> {/* 아이콘을 변경하지 않고 그대로 사용 */}
                </div>
                <div className="font-semibold text-[26px] pl-[12px]">{place_name || "이름없음"}</div>
                <a
                  href={place_url}
                  target="_blank"
                  className="text-primary text-[14px] pl-[12px] pr-[20px] hover:text-[#4938ff]"
                >
                  웹사이트 바로가기
                </a>
                <div className="text-darkgray text-[14px] pl-[12px]">
                  {address_name || road_address_name}
                  <br />
                  {phone || "번호없음"}
                </div>
                {tagList?.map((tag, idx) => {
                  if (idx === 0) return null;
                  return <Tag key={tag.tag} tagText={`${tag.tag} - ${tag.count}`} />;
                })}
              </div>
              <div className="flex items-center text-white rounded-[20px] bg-[#1919707f] w-full justify-center p-[10px]">
                {`${place_name}`}&nbsp; 카페는 &nbsp; <MyTag /> &nbsp; 곳이라 좋아요
              </div>
            </div>
            <CommentBox />
          </div>
        </Modal>
      </ContentLayout>
    </div>
  );
};

export default CafeDetail;

const ModalImage = () => {
  const { selectedCafe } = useCafeStore();
  const { place_name } = selectedCafe;
  const { data: naverImage, isLoading: isImageLoading, error: imageError } = useGetImage(place_name);

  if (isImageLoading) return <div>이미지 불러오는 중..</div>;
  if (imageError) return <div>이미지 불러오기 실패</div>;

  return (
    <div className="flex flex-wrap">
      {naverImage &&
        naverImage.map((image, idx) => {
          if (idx >= 3) return;
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
  );
};
