import { useState, useEffect } from "react";
import Icon from "./common/Icon";
import MainTag from "./common/MainTag";
import supabase from "../services/supabase";

const CafeCard = () => {
  const cafes = [
    {
      id: "00000000-0000-0000-0000-000000000001", // 예시 cafe_id 1
      place_name: "컴포즈 커피 부천점",
      address_name: "여월동 사단지 어쩌고 길주로",
      road_address_name: "d"
    },
    {
      id: "00000000-0000-0000-0000-000000000002", // 예시 cafe_id 2
      place_name: "카페 드롭탑 부천점",
      address_name: "부천로 123",
      road_address_name: "e"
    },
    {
      id: "00000000-0000-0000-0000-000000000003", // 예시 cafe_id 3
      place_name: "스타벅스 부천점",
      address_name: "여월로 456",
      road_address_name: "f"
    }
  ];

  const [bookmarkedCafes, setBookmarkedCafes] = useState({});

  // 로그인한 사용자 정보 가져오기
  const fetchUser = async () => {
    const { data: authUser, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser?.user) {
      console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
      return;
    }
    return authUser.user.id;
  };

  // 북마크 상태 확인
  const checkIfBookmarked = async (userId, cafeId) => {
    const { data, error } = await supabase.from("bookmarks").select("id").eq("users_uid", userId).eq("cafe_id", cafeId);

    if (error) {
      console.error("북마크 상태 확인에 실패했습니다.", error.message);
      return false;
    }

    return data.length > 0; // 데이터가 하나라도 있으면 북마크 상태
  };

  // 북마크 추가/제거 핸들러
  const handleBookmark = async (cafeId) => {
    const userId = await fetchUser();
    if (!userId) return;

    const isAlreadyBookmarked = bookmarkedCafes[cafeId];

    if (isAlreadyBookmarked) {
      console.log("북마크 해제");
      const { error } = await supabase.from("bookmarks").delete().eq("users_uid", userId).eq("cafe_id", cafeId);
      if (error) {
        console.error("북마크 해제에 실패했습니다.", error.message);
      } else {
        setBookmarkedCafes((prev) => ({ ...prev, [cafeId]: false })); // 상태 업데이트
      }
    } else {
      console.log("북마크 추가");
      const { error } = await supabase.from("bookmarks").insert([{ users_uid: userId, cafe_id: cafeId }]);
      if (error) {
        console.error("북마크 추가에 실패했습니다.", error.message);
      } else {
        setBookmarkedCafes((prev) => ({ ...prev, [cafeId]: true })); // 상태 업데이트
      }
    }
  };

  useEffect(() => {
    const fetchInitialBookmarkStatus = async () => {
      const userId = await fetchUser();
      if (userId) {
        const initialStatuses = {};
        for (const cafe of cafes) {
          const status = await checkIfBookmarked(userId, cafe.id);
          initialStatuses[cafe.id] = status;
        }
        setBookmarkedCafes(initialStatuses);
      }
    };

    fetchInitialBookmarkStatus();
  }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cafes.map((cafe) => (
        <div
          key={cafe.id}
          className="shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-full flex flex-col items-center gap-[16px] text-white rounded-[20px]"
        >
          <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
            <div className="flex justify-between w-full items-center pr-[12px]">
              <MainTag tagText="혼자 공부하기 좋은" />
              <Icon
                icon="bookMark"
                onClick={() => handleBookmark(cafe.id)}
                className={`${bookmarkedCafes[cafe.id] ? "text-yellow-500" : "text-white"} cursor-pointer`}
              />
            </div>
            <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{cafe.place_name}</div>
            <div className="text-lightgray text-[14px] pl-[12px]">{cafe.address_name || cafe.road_address_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeCard;
