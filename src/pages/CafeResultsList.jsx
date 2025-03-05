// import Tag from "../components/common/Tag";
// import { CafeTagTypes } from "../data/CafeTypes";
// import ContentLayout from "../components/layout/ContentLayout";
// import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
// import useCafeStore from "../stores/useCafeStore";
// import useGetCafes from "../tanstack/queries/useGetCafes";
// import useGetLocation from "../tanstack/queries/useGetLocation";
// import { useKakaoLoader } from "react-kakao-maps-sdk";
// import { useEffect, useState } from "react";
// import supabase from "../services/supabase";

// const CafeResultsList = () => {
//   const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
//   const { cafes } = useCafeStore();
//   const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);
//   const [selected, setSelected] = useState(null); // 태그 선택
//   const [filteredCafes, setFilteredCafes] = useState([]);

//   const [loading, loadError] = useKakaoLoader({
//     appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
//     libraries: ["services"]
//   });

//   const handleSelectTag = (index) => {
//     setSelected((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     const fetchFilteredCafes = async () => {
//       if (selected === null) {
//         setFilteredCafes(cafes); // 전체 카페 보여주기
//         return;
//       }
//       try {
//         // Supabase에서 cafe_id와 tag_type 가져오기
//         const { data, error } = await supabase.from("tags").select("cafe_id, tag_type");
//         if (error) {
//           console.error("Supabase 데이터 가져오기 실패:", error);
//           return;
//         }
//         // 선택한 태그의 실제 문자열 값 찾기
//         const selectedTagText = Object.values(CafeTagTypes)[selected];
//         // 유저가 선택한 태그와 매칭되는 cafe_id 찾기
//         const matchedCafeIds = data.filter((tag) => tag.tag_type === selectedTagText).map((tag) => tag.cafe_id);
//         // cafe_id가 매칭되는 카페 필터링하기
//         const filtered = cafes.filter((cafe) => matchedCafeIds.includes(cafe.id));
//         setFilteredCafes(filtered);
//       } catch (error) {
//         console.error("카페 필터링 중 오류 발생:", error);
//       }
//     };
//     fetchFilteredCafes();
//   }, [selected, cafes]);

//   if (loading || isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
//   if (locationError || cafesError || loadError) return <p>카페 로딩 오류 발생</p>;

//   return (
//     <ContentLayout>
//       {position && (
//         <div>
//           {/* 태그 */}
//           <div className="grid grid-cols-5 items-center p-5 gap-5 w-[1000px] whitespace-nowrap [&>*]:hover:cursor-pointer [&>/]:active:bg-orange-600 [&>*]:bg-[#191971] [&>*]:text-white mb-10 [&>*]:text-[11px] justify-i">
//             {Object.entries(CafeTagTypes).map(([key, value], index) => (
//               <Tag
//                 key={key}
//                 tagText={value}
//                 isSelected={selected === index}
//                 onClick={() => handleSelectTag(index)}
//                 className="checked:bg-red-400"
//               />
//             ))}
//           </div>

//           {/* 카페 카드들 */}
//           {filteredCafes.length === 0 ? (
//             <p className="flex justify-center items-center">해당 태그를 가진 카페가 없습니다.</p>
//           ) : (
//             <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
//               {filteredCafes.map((cafe) => (
//                 <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </ContentLayout>
//   );
// };

// export default CafeResultsList;
//-----------------------------------------------------------------------------------------------------------------------1

// import Tag from "../components/common/Tag";
// import { CafeTagTypes } from "../data/CafeTypes";
// import ContentLayout from "../components/layout/ContentLayout";
// import CafeCard from "../components/CafeCard";
// import useGetLocation from "../tanstack/queries/useGetLocation";
// import { useKakaoLoader } from "react-kakao-maps-sdk";
// import { useEffect, useState } from "react";
// import supabase from "../services/supabase";
// import UseSearchCafes from "../tanstack/queries/useSearchCafes"
// import { useInView } from "react-intersection-observer";
// import { useInfiniteQuery } from "@tanstack/react-query";

// const CafeResultsList = ({lat, lng, radius = 3000}) => {
//   const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();

//   const fetchCafes = async ({page = 0 }) => {
//     const res = await UseSearchCafes(lat, lng, page, radius);
//     return res;
//   }

//   // const data = fetchCafes(40.7128, -73.9879, 2, 3000);
//   // console.log("CAAAAFEEESSSS==>", data)

//   const {
//     data: cafes,
//     loadNextPage,//다음 페이지 가져오는 기능
//     hasNextPage,//다음 페이지 존재 확인 기능
//     isLoadingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["cafes"], //queryKey가 변경되면 React Query가 자동으로 새 데이터를 가져와서 캐시를 갱신함
//     queryFn: fetchCafes,
//     getNextPageParam: (lastPage) => {
//       console.log("getNextPageParam 호출");
//       console.log("lastPage: ", lastPage);
//       if (lastPage.page < lastPage.total_pages) {
//         console.log("다음 페이지로 pageParam 저장");
//         return lastPage.page + 1;
//       } else {
//       return undefined;
//       }
//     },
//     select: (data) => {
//       return data.pages.map((pageData) => pageData.results).flat(); //2차원을 1차원 배열로 전환 === 모든 results 데이터를 하나의 배열로 변환
//     },
//     // enabled: !!lat && !!lng, // 위치 정보가 있을 때만 실행
//     staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
//   });

//   const {ref} = useInView({
//     threshold: 1,
//     onChange: (InView) => {
//       if (!InView || !hasNextPage || isLoadingNextPage) return;
//       loadNextPage();
//     }
//   });

//   const [selected, setSelected] = useState(null); // 태그 선택
//   const [filteredCafes, setFilteredCafes] = useState([]);

//   const [loading, loadError] = useKakaoLoader({
//     appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
//     libraries: ["services"]
//   });

//   const handleSelectTag = (index) => {
//     setSelected((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     const fetchFilteredCafes = async () => {
//       if (!cafes) {
//         setFilteredCafes([]); // cafes가 undefined면 빈 배열로 설정
//         return;
//       }
//       if (selected === null) {
//         setFilteredCafes(cafes); // 전체 카페 보여주기
//         return;
//       }
//       try {
//         // Supabase에서 cafe_id와 tag_type 가져오기
//         const { data, error } = await supabase.from("tags").select("cafe_id, tag_type");
//         if (error) {
//           console.error("Supabase 데이터 가져오기 실패:", error);
//           return;
//         }
//         // 선택한 태그의 실제 문자열 값 찾기
//         const selectedTagText = Object.values(CafeTagTypes)[selected];
//         // 유저가 선택한 태그와 매칭되는 cafe_id 찾기
//         const matchedCafeIds = data.filter((tag) => tag.tag_type === selectedTagText).map((tag) => tag.cafe_id);
//         // cafe_id가 매칭되는 카페 필터링하기
//         const filtered = cafes.filter((cafe) => matchedCafeIds.includes(cafe.id));
//         setFilteredCafes(filtered);
//       } catch (error) {
//         console.error("카페 필터링 중 오류 발생:", error);
//       }
//     };
//     fetchFilteredCafes();
//   }, [selected, cafes]);

//     console.log("filteredCafes===>", filteredCafes);
//   console.log("selected===> ", selected);
//   console.log("cafes", cafes)

//   if (loading || isLocationLoading ) return <p>카페 로딩 중...</p>;
//   if (locationError || loadError) return <p>카페 로딩 오류 발생</p>;

//   return (
//     <ContentLayout>
//       {position && (
//         <div>
//           {/* 태그 */}
//           <div className="grid grid-cols-5 items-center p-5 gap-5 w-[1000px] whitespace-nowrap [&>*]:hover:cursor-pointer [&>/]:active:bg-orange-600 [&>*]:bg-[#191971] [&>*]:text-white mb-10 [&>*]:text-[11px] justify-i">
//             {Object.entries(CafeTagTypes).map(([key, value], index) => (
//               <Tag key={key} tagText={value} isSelected={selected === index} onClick={() => handleSelectTag(index)} className="checked:bg-red-400"/>
//             ))}
//           </div>

//           {/* 카페 카드들 */}
//           {filteredCafes.length === 0 ? (
//             <p className="flex justify-center items-center">해당 태그를 가진 카페가 없습니다.</p>
//           ) : (
//             <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
//               {filteredCafes.map((cafe) => (
//                 <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
//               ))}
//             </div>
//           )}

//           {/* 무한 스크롤: 더 불러오기 버튼 */}
//           {hasNextPage && (
//             <button ref={ref} onClick={() => loadNextPage()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//               더 불러오기
//             </button>
//           )}
//         </div>
//       )}
//     </ContentLayout>
//   );
// };

// export default CafeResultsList;

import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useGetLocation from "../tanstack/queries/useGetLocation";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import { getAllCafes } from "../tanstack/queries/useGetCafes";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const CafeResultsList = () => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();

  // useEffect(() => {
  //     const fetchData = async () => {
  //     const { results, page, total_pages, error } = await getAllCafes();
  //     console.log("fetchedCafes", results, "=========", page, "=========", total_pages, "=========", error);
  //   };
  //   fetchData();

  // }, [])

  console.log("thisisdklfeisl");
  // console.log(UseGetAllCafes());
  // console.log("LLLLLOOOOOOOOOOOKKKKKKKKKKKKK===>", results, "==============", page, "=================", total_pages, "error=>!!!!!!!!!!!!!!!!!!!!!!!!!", error);

  const {
    data: cafes,
    loadNextPage, // 다음 페이지 가져오는 기능
    hasNextPage, // 다음 페이지 존재 확인 기능
    isLoadingNextPage
  } = useInfiniteQuery({
    queryKey: ["cafes"], // queryKey로 상태를 관리
    queryFn: getAllCafes,
    getNextPageParam: (lastPage) => {
      // 페이지네이션 처리: lastPage는 UseGetAllCafes에서 반환된 데이터
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // 다음 페이지 번호 반환
      } else {
        return undefined; // 더 이상 페이지가 없다면 undefined 반환
      }
    },
    select: (data) => {
      // 여러 페이지 데이터를 하나의 배열로 합침
      return data.pages.map((pageData) => pageData.results).flat(); // 2차원 배열을 1차원 배열로 평탄화
    },
    staleTime: 1000 * 60 * 1 // 1분 동안 캐싱 유지
  });

  // console.log("cafes", cafes);

  const { ref } = useInView({
    threshold: 1,
    onChange: (InView) => {
      if (!InView || !hasNextPage || isLoadingNextPage) return;
      loadNextPage();
    }
  });

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
      } catch (error) {
        console.error("카페 필터링 중 오류 발생:", error);
      }
    };
    fetchFilteredCafes();
  }, [selected, cafes]);

  if (loading || isLocationLoading) return <p>카페 로딩 중...</p>;
  if (locationError || loadError) return <p>카페 로딩 오류 발생</p>;

  return (
    <ContentLayout>
      {position && (
        <div>
          {/* 태그 */}
          <div className="grid grid-cols-5 items-center p-5 gap-5 w-[1000px] whitespace-nowrap [&>*]:hover:cursor-pointer [&>/]:active:bg-orange-600 [&>*]:bg-[#191971] [&>*]:text-white mb-10 [&>*]:text-[11px] justify-i">
            {Object.entries(CafeTagTypes).map(([key, value], index) => (
              <Tag
                key={key}
                tagText={value}
                isSelected={selected === index}
                onClick={() => handleSelectTag(index)}
                className="checked:bg-red-400"
              />
            ))}
          </div>

          {/* 카페 카드들 */}
          {filteredCafes === undefined ? (
            <p className="flex justify-center items-center">해당 태그를 가진 카페가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
              {filteredCafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
              ))}
            </div>
          )}

          {/* 무한 스크롤: 더 불러오기 버튼 */}
          {hasNextPage && (
            <button ref={ref} onClick={() => loadNextPage()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              더 불러오기
            </button>
          )}
        </div>
      )}
    </ContentLayout>
  );
};

export default CafeResultsList;
