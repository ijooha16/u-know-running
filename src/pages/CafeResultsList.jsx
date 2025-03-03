import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useCafeStore from "../stores/useCafeStore";
import useGetCafes from "../tanstack/queries/useGetCafes";
import useGetLocation from "../tanstack/queries/useGetLocation";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";


const CafeResultsList = () => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { cafes } = useCafeStore();
  const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);
  const [selected, setSelected] = useState(null);

  const [loading, loadError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["services"]
  });

  if (loading || isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
  if (locationError || cafesError || loadError) return <p>카페 로딩 오류 발생</p>;

const filteredCafes = cafes.filter((cafe) => {
  if (selected === null) return true;
  
  // console.log("CafeTagTypes[selected] ==> ", Object.values(CafeTagTypes)[selected]);
  // console.log("cafe.MainTag.tagText:", cafe.MainTag);

  // MainTag가 존재하고 tagText 속성이 있을 때만 접근
  if (cafe.MainTag && cafe.MainTag.tagText) {
    // 원래는 return cafe.MainTag.tagText === CafeTagTypes[selected]; 가 되어야 하지만 지금은 CafeCard의 Maintag가 하드코딩된 상태라서 cafe대신 cafecard를 사용함
    return cafe.MainTag.tagText === CafeTagTypes[selected];
  }
  
  return false;
});

  console.log("this is selected tag ==> ", selected);



  return (
    <ContentLayout>
      {position && (
        <div>
          {/* 태그 */}
          <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:text-white [&>*]:hover:cursor-pointer ">
          {Object.entries(CafeTagTypes).map(([key, value], index) => (
              <Tag key={key} tagText={value} isSelected={selected === index} onClick={() => setSelected(index)} className="hover:bg-blue-400"/>
          ))}
          </div>
          
          {/* 카페 카드들 */}
          <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit mt-10 columns-3">
          {filteredCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
          ))}
          </div>
        </div>
      )}
    </ContentLayout>
  );
};




export default CafeResultsList;