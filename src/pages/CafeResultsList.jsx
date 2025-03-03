import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useCafeStore from "../stores/useCafeStore";
import useGetCafes from "../tanstack/queries/useGetCafes";
import useGetLocation from "../tanstack/queries/useGetLocation";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useState } from "react";


const CafeResultsList = () => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { cafes } = useCafeStore();
  const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);
  const [selected, setSelected] = useState(null); // 태그 선택

  const [loading, loadError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["services"]
  });

  if (loading || isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
  if (locationError || cafesError || loadError) return <p>카페 로딩 오류 발생</p>;



//cafes 들어오는지, cafe들어오는지, selected 들어오는지,

const filteredCafes = cafes.filter((cafe) => {
  if (selected === null) return true;

  // MainTag가 존재하고 tagText 속성이 있을 때만 접근 (삭제하면 둘 중 하나 값이 undefined일 때 오류가 남)
  if (cafe.MainTag && cafe.MainTag.tagText) {
    console.log("cafe.Maintag까지 ==> ", cafe.MainTag);
    console.log("cafe.Maintag.tagtest까지 ==> ", cafe.MainTag.tagText);
    console.log("CafeTagTypes[selected]", CafeTagTypes[selected])
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

  return (
    <ContentLayout>
      {position && (
        <div>
          {/* 태그 */}
          <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:hover:cursor-pointer mb-10">
          {Object.entries(CafeTagTypes).map(([key, value], index) => (
              <Tag key={key} tagText={value} isSelected={selected === index} onClick={() => handleSelectTag(index)}/>
          ))}
          </div>
          
          {/* 카페 카드들 */}
          <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit">
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