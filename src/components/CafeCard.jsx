import { useState, useEffect } from "react";
import Icon from "./common/Icon";
import MainTag from "./common/MainTag";
import supabase from "../services/supabase";
import { getCafeTopTags } from "../services/tag";  // getCafeTopTags 함수 가져오기
import { fetchNaverImage } from "../services/naverimage";

const CafeCard = ({cafe, cafeKey}) => {

  const { place_name, address_name, road_address_name, id: cafeId } = cafe;
  const [tags, setTags] = useState([]); // 태그 상태
  const [image, setImage] = useState("");




  // 카페 이미지 가져오기
  useEffect(() => {
    const loadPreview = async () => {
      const imgUrl = await fetchNaverImage(place_name);
      setImage(imgUrl || null); // 기본 이미지 설정 가능
      console.log("image==> ", imgUrl);
    };
    loadPreview();
  }, [place_name]);

  const [bookmarkedCafes, setBookmarkedCafes] = useState({});




  
  useEffect(() => {
    // 카페의 ID에 맞는 태그를 가져오기
    const fetchTags = async () => {
      try {
        const topTags = await getCafeTopTags(cafeId);
        setTags(topTags.map(tag => tag.tag));  // 상위 4개의 태그만 사용
      } catch (error) {
        console.error("태그 가져오기 오류:", error);
      }
    };    
    if (cafeId) {
      fetchTags();
    }
  }, [cafeId]);  // cafeId가 변경될 때마다 태그를 가져옵니다.
  console.log(image);

  useEffect(() => {
    const fetchInitialBookmarkStatus = async () => {
      const userId = await fetchUser();
      if (userId) {
        const initialStatuses = {};
        for (const cafe of cafe) {
          const status = await checkIfBookmarked(userId, cafe.id);
          initialStatuses[cafe.id] = status;
        }
        setBookmarkedCafes(initialStatuses);
      }
    };

    fetchInitialBookmarkStatus();
  }, []); // 빈 의존성 배열로 한 번만 실행되도록 설정

  if (!cafe) {
    return null; // cafe가 없으면 아무것도 렌더링하지 않음
  }

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


  return (
    <div key={cafeKey} className={`shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-auto w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]`}>
      <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
        <img src={image} className="w-full h-full"/>
        <div className="flex justify-between w-full items-center pr-[12px]">
          {/* <MainTag tagText="혼자 공부하기 좋은" /> */}
          {tags.length > 0 ? (
            tags.map((tag, index) => <MainTag key={index} tagText={tag} />)
          ) : (
            <MainTag tagText="혼자 공부하기 좋은" /> // 기본 태그
          )}
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








  // return (
  //   <div key={cafeKey} className={`shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-auto w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]`}>
  //     <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
  //       <img src={image} className="w-full h-full"/>
  //       <div className="flex justify-between w-full items-center pr-[12px]">
  //         {/* <MainTag tagText="혼자 공부하기 좋은" /> */}
  //         {tags.length > 0 ? (
  //           tags.map((tag, index) => <MainTag key={index} tagText={tag} />)
  //         ) : (
  //           <MainTag tagText="혼자 공부하기 좋은" /> // 기본 태그
  //         )}
  //        <Icon
  //          icon="bookMark"
  //          onClick={() => handleBookmark(cafe.id)}
  //          className={`${bookmarkedCafes[cafe.id] ? "text-yellow-500" : "text-white"} cursor-pointer`}
  //        />
  //       </div>
  //       <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
  //       <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
  //     </div>
  //   </div>
  // );
// };


// export default CafeCard;

//----------------------------
// 내(수민)가 3/2 4시반에 건들이기 전 원래 내용
// // import useCafeStore from "../stores/useCafeStore";
// import Icon from "./common/Icon";
// import MainTag from "./common/MainTag";


// const CafeCard = () => {
//   // const { selectedCafe } = useCafeStore();
//   // const { place_name, road_address_name, address_name, phone, place_url } = selectedCafe;
//   const place_name = "컴포즈 커피 부천점";
//   const address_name = "여월동 사단지 어쩌고 길주로";
//   const road_address_name = "d";


//   return (
//     <div className="shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-full w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]">
//       <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
//         <div className="flex justify-between w-full items-center pr-[12px]">
//           <MainTag tagText="혼자 공부하기 좋은" />
//           <Icon icon="bookMark" />
//         </div>
//         <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
//         <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
//       </div>
//     </div>
//   );
// };


// export default CafeCard;


//////////////////----------3/3 7/30pm

