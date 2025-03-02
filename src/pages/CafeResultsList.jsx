// import Tag from "../components/common/Tag";
// import { CafeTagTypes } from "../data/CafeTypes";
// import ContentLayout from "../components/layout/ContentLayout";
// import CafeCard from "../components/CafeCard";
// import { useEffect, useState } from "react";
// import { getLocation } from "../services/location";


// const CafeResultsList = () => {
//   const dummyCafeData = [
//     {
//       id: "1",
//       place_name: "스타벅스 강남점",
//       address_name: "서울 강남구 테헤란로 123",
//       road_address_name: "서울 강남구 테헤란로 123",
//       phone: "02-1234-5678",
//       place_url: "https://place.map.kakao.com/1",
//       x: "127.0276",
//       y: "37.4979",
//       tags: ["혼자 공부하기 좋은"],
//     },
//     {
//       id: "2",
//       place_name: "투썸플레이스 신촌점",
//       address_name: "서울 서대문구 신촌로 22",
//       road_address_name: "서울 서대문구 신촌로 22",
//       phone: "02-9876-5432",
//       place_url: "https://place.map.kakao.com/2",
//       x: "126.9372",
//       y: "37.5599",
//       tags: ["모임하기 좋은"],
//     },
//     {
//       id: "3",
//       place_name: "이디야커피 홍대점",
//       address_name: "서울 마포구 홍익로 10",
//       road_address_name: "서울 마포구 홍익로 10",
//       phone: "02-5678-1234",
//       place_url: "https://place.map.kakao.com/3",
//       x: "126.9239",
//       y: "37.5561",
//       tags: ["강아지와 함께 갈 수 있는"],
//     },
//   ];


//   const [cafes, setCafes] = useState(dummyCafeData);
//   const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태


//   useEffect(() => {
//     setCafes(dummyCafeData); // 더미 데이터 설정
//   }, []);


//   // 태그를 선택했을 때 필터링된 카페 데이터 반환
//   const filteredCafes = selectedTag
//     ? cafes.filter((cafe) => cafe.tags.includes(selectedTag))
//     : cafes;


//   return (
//     <ContentLayout>
//       <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:text-white [&>*]:bg-[#191970] [&>*]:hover:cursor-pointer">
//         {Object.entries(CafeTagTypes).map(([key, value]) => (
//           <Tag
//             key={key}
//             tagText={value}
//             onClick={() => setSelectedTag(value)} // 태그 클릭 시 선택된 태그 업데이트
//           />
//         ))}
//       </div>


//       {filteredCafes.length > 0 ? (
//         <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit mt-5">
//           {/* 필터링된 카페 카드들 출력 */}
//           {filteredCafes.map((cafe) => (
//             <CafeCard key={cafe.id} cafe={cafe} />
//           ))}
//         </div>
//       ) : (
//         <>
//           <p>카페 정보가 없습니다.</p>
//           <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit mt-5">
//             <CafeCard />
//             <CafeCard />
//             <CafeCard />
//             <CafeCard />
//             <CafeCard />
//             <CafeCard />
//           </div>
//         </>
//       )}
//     </ContentLayout>
//   );
// };


// export default CafeResultsList;


import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useCafeStore from "../stores/useCafeStore";
import useGetCafes from "../tanstack/queries/useGetCafes";
import useGetLocation from "../tanstack/queries/useGetLocation";


const CafeResultsList = () => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { selectedCafe, setSelectedCafe, cafes } = useCafeStore();


  const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);


  console.log(cafes);


  return (
    <ContentLayout>
      <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:text-white [&>*]:bg-[#191970] [&>*]:hover:cursor-pointer [&>*]:active:bg-[#3434a7]">
        {/* 여기 map사용해서 enum 태그들 가져오기 */}
        {Object.entries(CafeTagTypes).map(([key, value]) => (
          <Tag key={key} tagText={value} />
        ))}
      </div>


      {cafes.length > 0 ? (
        <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit mt-5">
          {/* 카페 카드들 출력 */}
          {cafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      ) : (
        <>
          <p>카페 정보가 없습니다.</p>
        </>
      )}
    </ContentLayout>
  );
};


export default CafeResultsList;


