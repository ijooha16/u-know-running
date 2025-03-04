import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import MainTag from "../components/common/MainTag";
import MyTag from "../components/common/MyTag";
import Tag from "../components/common/Tag";
import Modal from "../components/Modal";
import useCafeStore from "../stores/useCafeStore";
import ContentLayout from "../components/layout/ContentLayout";
// import { useGetCafeTopTags } from "../tanstack/queries/useGetCafeTags";
// import { useGetImage } from "../tanstack/queries/useGetImage";
import supabase from "../services/supabase";

const CafeDetail = () => {
  const { selectedCafe, setSelectedCafe } = useCafeStore();
  const { id: cafe_id, place_name, road_address_name, address_name, phone, place_url } = selectedCafe;
  const { data: tagList, isLoading, error } = useGetCafeTopTags(cafe_id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userData, setUserData] = useState(null); // supabase에서 유저 데이터 관리
  const [isUserLoaded, setIsUserLoaded] = useState(false); // 사용자 로딩 상태 관리
  const { data: naverImage, isLoading: isImageLoading, error: imageError } = useGetImage(place_name);

  useEffect(() => {
    // Supabase에서 현재 로그인된 사용자 정보를 가져옴
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser(); // getUser() 사용
      if (error) {
        console.error("로그인된 사용자 정보 조회 실패:", error);
        setIsUserLoaded(true); // 오류가 발생하더라도 로딩 완료 처리
        return;
      }
      if (data.user) {
        setUserData(data.user);
      }
      setIsUserLoaded(true); // 사용자 데이터 로드 완료
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const loadPreview = async () => {
      const imgUrl = await fetchNaverImage(place_name);
      setImage(imgUrl || null);
    };

    loadPreview();
  }, [place_name]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!userData?.id || !cafe_id) return;
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("users_uid", userData.id)
        .eq("cafe_id", cafe_id);

      if (error) {
        console.error("북마크 조회 실패:", error);
        return;
      }
      setIsBookmarked(data.length > 0);
    };

    if (userData && isUserLoaded) {
      checkBookmark();
    }
  }, [userData, cafe_id, isUserLoaded]);

  const toggleBookmark = async () => {
    // userData가 비어있으면 알림
    if (!userData?.id) {
      alert("로그인이 필요합니다!");
      return;
    }

    const { id: cafe_id, place_name, road_address_name, address_name, phone } = selectedCafe;

    if (isBookmarked) {
      // 북마크 삭제
      const { error } = await supabase.from("bookmarks").delete().eq("users_uid", userData.id).eq("cafe_id", cafe_id);

      if (error) {
        console.error("북마크 삭제 실패:", error);
        return;
      }
      setIsBookmarked(false);
      alert("북마크가 삭제되었습니다!"); // ✅ 북마크 삭제 후 alert 메시지
    } else {
      // 북마크 추가
      const { error } = await supabase.from("bookmarks").insert([
        {
          users_uid: userData.id,
          cafe_id,
          place_name,
          road_address_name,
          address_name,
          phone,
          place_url
        }
      ]);

      if (error) {
        console.error("북마크 추가 실패:", error);
        return;
      }
      setIsBookmarked(true);
      alert("북마크가 추가되었습니다!"); // ✅ 북마크 추가 후 alert 메시지
    }
  };

  if (!selectedCafe) return null;

  if (isLoading) return <div>태그 로딩 중..</div>;
  if (error) return <div>태그 불러오기 실패</div>;

  if (isImageLoading) return <div>이미지 불러오는 중..</div>;
  if (imageError) return <div>이미지 불러오기 실패</div>;

  return (
    <div
      onClick={() => setSelectedCafe(null)}
      className="z-50 fixed flex justify-center top-0 left-0 w-screen h-screen bg-[#000000a8]"
    >
      <ContentLayout>
        <Modal>
          <div className="flex gap-[30px]">
            <div className="min-h-[320px]">
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
                    <Icon icon="bookMark" onClick={toggleBookmark} /> {/* ✅ 아이콘을 변경하지 않고 그대로 사용 */}
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

const Img = ({ img }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  return isLoaded ? <img src={img} alt="이미지가 없습니다" onError={() => setIsLoaded(false)} /> : null;
};
