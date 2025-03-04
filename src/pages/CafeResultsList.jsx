import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useCafeStore from "../stores/useCafeStore";
import useGetCafes from "../tanstack/queries/useGetCafes";
import useGetLocation from "../tanstack/queries/useGetLocation";
import { useKakaoLoader } from "react-kakao-maps-sdk";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import supabase from "../services/supabase";
=======
import { useState } from "react";
>>>>>>> df76c1d (fix: 디테일 수정....)

const CafeResultsList = () => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { cafes } = useCafeStore();
  const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);
  const [selected, setSelected] = useState(null); // 태그 선택
  const [filteredCafes, setFilteredCafes] = useState([]);

  const [loading, loadError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["services"]
  });

  const handleSelectTag = (index) => {
    setSelected((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const fetchFilteredCafes = async () => {
      if (selected === null) {
        setFilteredCafes(cafes); // 전체 카페 보여주기
        return;
      }
      try {
        // Supabase에서 cafe_id와 tag_type 가져오기
        const { data, error } = await supabase.from("tags").select("cafe_id, tag_type");
        if (error) {
          console.error("Supabase 데이터 가져오기 실패:", error);
          return;
        }
        // 선택한 태그의 실제 문자열 값 찾기
        const selectedTagText = Object.values(CafeTagTypes)[selected];
        // 유저가 선택한 태그와 매칭되는 cafe_id 찾기
        const matchedCafeIds = data.filter((tag) => tag.tag_type === selectedTagText).map((tag) => tag.cafe_id);
        // cafe_id가 매칭되는 카페 필터링하기
        const filtered = cafes.filter((cafe) => matchedCafeIds.includes(cafe.id));
        setFilteredCafes(filtered);
        console.log("cafes", cafes);
        console.log("cafe", matchedCafeIds);
      } catch (error) {
        console.error("카페 필터링 중 오류 발생:", error);
      }
    };
    fetchFilteredCafes();
  }, [selected, cafes]);




  if (loading || isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
  if (locationError || cafesError || loadError) return <p>카페 로딩 오류 발생</p>;

<<<<<<< HEAD
=======
  //cafes 들어오는지, cafe들어오는지, selected 들어오는지,

  const filteredCafes = cafes.filter((cafe) => {
    if (selected === null) return true;

    // MainTag가 존재하고 tagText 속성이 있을 때만 접근 (삭제하면 둘 중 하나 값이 undefined일 때 오류가 남)
    if (cafe.MainTag && cafe.MainTag.tagText) {
      console.log("cafe.Maintag까지 ==> ", cafe.MainTag);
      console.log("cafe.Maintag.tagtest까지 ==> ", cafe.MainTag.tagText);
      console.log("CafeTagTypes[selected]", CafeTagTypes[selected]);
      return cafe.MainTag.tagText === CafeTagTypes[selected];
    }
    return false;
  });

  console.log("this is selected tag ==> ", selected);

  const handleSelectTag = (index) => {
    if (selected === index) {
      // 이미 선택된 태그를 다시 클릭하면 선택 취소
      setSelected(null);
    } else {
      // 선택되지 않은 태그를 클릭하면 해당 태그 선택
      setSelected(index);
    }
  };

>>>>>>> df76c1d (fix: 디테일 수정....)
  return (
    <ContentLayout>
      {position && (
        <div>
          {/* 태그 */}
<<<<<<< HEAD
          <div className="grid grid-cols-5 items-center p-5 gap-5 w-[1000px] whitespace-nowrap [&>*]:hover:cursor-pointer [&>/]:active:bg-orange-600 [&>*]:bg-[#191971] [&>*]:text-white mb-10 [&>*]:text-[11px] justify-i">
            {Object.entries(CafeTagTypes).map(([key, value], index) => (
              <Tag key={key} tagText={value} isSelected={selected === index} onClick={() => handleSelectTag(index)} className="checked:bg-red-400"/>
=======
          <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:hover:cursor-pointer mb-10">
            {Object.entries(CafeTagTypes).map(([key, value], index) => (
              <Tag key={key} tagText={value} isSelected={selected === index} onClick={() => handleSelectTag(index)} />
>>>>>>> df76c1d (fix: 디테일 수정....)
            ))}
          </div>

          {/* 카페 카드들 */}
<<<<<<< HEAD
          {filteredCafes.length === 0 ? (
            <p className="flex justify-center items-center">해당 태그를 가진 카페가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
              {filteredCafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
              ))}
            </div>
          )}
=======
          <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
            {filteredCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
            ))}
          </div>
>>>>>>> df76c1d (fix: 디테일 수정....)
        </div>
      )}
    </ContentLayout>
  );
};

export default CafeResultsList;
<<<<<<< HEAD



// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import useGetLocation from "../tanstack/queries/useGetLocation";
// import useGetInfiniteCafes from "../tanstack/queries/useGetInfiniteCafes";
// import ContentLayout from "../components/layout/ContentLayout";
// import CafeCard from "../components/CafeCard";
// import Tag from "../components/common/Tag";
// import { CafeTagTypes } from "../data/CafeTypes";

// const DEFAULT_TAG = "혼자 공부하기 좋은"; // 기본 태그 설정

// const CafeResultsList = () => {
//   const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
//   const { ref, inView } = useInView(); // 무한 스크롤 감지

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading: isCafesLoading,
//     error: cafesError,
//   } = useGetInfiniteCafes(position?.lat, position?.lng);

//   const [selected, setSelected] = useState(null);
//   const [filteredCafes, setFilteredCafes] = useState([]);

//   const handleSelectTag = (index) => {
//     setSelected((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     if (!data) return;
    
//     // 전체 카페 리스트 가져오기
//     const allCafes = data.pages.flatMap((page) => page.cafes);

//     // 카페에 기본 태그 적용 (카카오 API에는 태그 정보 없음)
//     const cafesWithTags = allCafes.map((cafe) => ({
//       ...cafe,
//       tags: cafe.tags || [DEFAULT_TAG], // 태그가 없으면 기본 태그 적용
//     }));

//     if (selected === null) {
//       setFilteredCafes(cafesWithTags);
//       return;
//     }

//     const selectedTagText = Object.values(CafeTagTypes)[selected];
//     setFilteredCafes(cafesWithTags.filter((cafe) => cafe.tags.includes(selectedTagText)));
//   }, [selected, data]);

//   // 무한 스크롤: 마지막 데이터가 화면에 보이면 다음 페이지 요청
//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   if (isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
//   if (locationError || cafesError) return <p>카페 로딩 오류 발생</p>;

//   return (
//     <ContentLayout>
//       {position && (
//         <div>
//           {/* 태그 필터 */}
//           <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap">
//             {Object.entries(CafeTagTypes).map(([key, value], index) => (
//               <Tag
//                 key={key}
//                 tagText={value}
//                 isSelected={selected === index}
//                 onClick={() => handleSelectTag(index)}
//               />
//             ))}
//           </div>

//           {/* 카페 리스트 */}
//           <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
//             {filteredCafes.length === 0 ? (
//               <p className="flex justify-center items-center">해당 태그를 가진 카페가 없습니다.</p>
//             ) : (
//               filteredCafes.map((cafe, index) => (
//                 <CafeCard
//                   key={cafe.id}
//                   cafe={cafe}
//                   cafeKey={cafe.id}
//                   ref={index === filteredCafes.length - 1 ? ref : null} // 마지막 요소 감지
//                 />
//               ))
//             )}
//           </div>

//           {/* 로딩 UI */}
//           {isFetchingNextPage && <p className="text-center mt-4">카페 더 불러오는 중...</p>}
//         </div>
//       )}
//     </ContentLayout>
//   );
// };

// export default CafeResultsList;
=======
>>>>>>> df76c1d (fix: 디테일 수정....)
