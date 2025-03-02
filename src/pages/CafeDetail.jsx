import { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import MainTag from "../components/common/MainTag";
import Tag from "../components/common/Tag";
import Modal from "../components/Modal";
import useCafeStore from "../stores/useCafeStore";
import supabase from "../services/supabase";

const CafeDetail = () => {
  const { selectedCafe } = useCafeStore();
  const { place_name, road_address_name, address_name, phone, place_url } = selectedCafe || {};

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [user, setUser] = useState(null); // 로그인된 사용자 상태

  // 카페가 선택되지 않았을 때 return
  if (!selectedCafe) return null;

  // 로그인된 사용자 정보 가져오기
  const fetchUser = async () => {
    const { data: authUser, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser?.user) {
      console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
      return null;
    }
    return authUser.user.id;
  };

  // 북마크 상태 확인
  const checkBookmark = async (userId) => {
    if (!userId || !selectedCafe) return;
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("users_uid", userId) // users_uid로 필터
      .eq("cafe_id", selectedCafe.id)
      .single();

    if (data) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  // 만약 cafe_id가 숫자라면 uuid로 변환하거나, 숫자 대신 uuid를 사용해야 합니다.
  const handleBookmarkClick = async () => {
    const userId = await fetchUser();
    if (!userId) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const cafeId = selectedCafe.id; // 카페 ID가 숫자라면 아래처럼 변환 필요
    const cafeUuid = cafeId.toString(); // 숫자에서 uuid 형식으로 변환 (필요 시)

    if (isBookmarked) {
      const { error } = await supabase.from("bookmarks").delete().eq("users_uid", userId).eq("cafe_id", cafeUuid); // uuid 형식으로 비교

      if (error) {
        console.error("북마크 해제 실패", error);
      } else {
        setIsBookmarked(false); // 상태 업데이트
        alert("북마크가 해제되었습니다.");
      }
    } else {
      const { error } = await supabase.from("bookmarks").insert([
        {
          users_uid: userId,
          cafe_id: cafeUuid, // uuid 형식으로 저장
          place_name: selectedCafe.place_name,
          road_address_name: selectedCafe.road_address_name,
          address_name: selectedCafe.address_name,
          phone: selectedCafe.phone
        }
      ]);

      if (error) {
        console.error("북마크 추가 실패", error);
      } else {
        setIsBookmarked(true); // 상태 업데이트
        alert("북마크에 추가되었습니다.");
      }
    }
  };

  useEffect(() => {
    const fetchUserAndCheckBookmark = async () => {
      const userId = await fetchUser();
      if (userId) {
        setUser(userId);
        checkBookmark(userId);
      }
    };

    fetchUserAndCheckBookmark();
  }, [selectedCafe]); // selectedCafe가 변경될 때마다 실행

  return (
    <Modal>
      <div className="flex gap-[30px]">
        <div className="bg-white w-[400px] min-h-[400px]"></div>
        <div className="w-[400px] flex flex-col gap-[16px] justify-between py-[16px] items-end">
          <div className="w-full flex flex-col items-start gap-[20px]">
            <div className="flex justify-between w-full items-center pr-[12px]">
              <MainTag tagText="혼자 공부하기 좋은" />
              <Icon
                icon="bookMark"
                onClick={handleBookmarkClick}
                className={`cursor-pointer ${isBookmarked ? "text-yellow-500" : "text-white"}`}
              />
            </div>
            <div>
              <div className="font-semibold text-[26px] pl-[12px] mb-[10px]">{place_name}</div>
              <div className="text-darkgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
              <div className="text-darkgray text-[14px] pl-[12px]">{phone}</div>
            </div>
            <div className="flex gap-[12px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
              <Tag tagText="혼자 공부하기 좋은" />
              <Tag tagText="혼자 공부하기 좋은" />
              <Tag tagText="혼자 공부하기 좋은" />
            </div>
          </div>
          <a href={place_url} target="_blank" rel="noopener noreferrer">
            <Button text="웹사이트 바로가기" />
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default CafeDetail;
