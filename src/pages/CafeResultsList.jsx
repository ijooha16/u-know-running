import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중
import useCafeStore from "../stores/useCafeStore";
import useGetCafes from "../tanstack/queries/useGetCafes";
import useGetLocation from "../tanstack/queries/useGetLocation";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import supabase from "../services/supabase";

const CafeResultsList = () => {
  // const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const position = { lat: 37.5563, lng: 126.9236 };
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
      } catch (error) {
        console.error("카페 필터링 중 오류 발생:", error);
      }
    };
    fetchFilteredCafes();
  }, [selected, cafes]);

  if (loading || isLocationLoading || isCafesLoading) return <p>카페 로딩 중...</p>;
  if (locationError || cafesError || loadError) return <p>카페 로딩 오류 발생</p>;

  return (
    <>
      <div className="flex flex-col gap-[90px] min-h-[calc(100vh-420px)] my-[80px]">
        {/* 태그 */}
        <div className="w-[1000px] flex flex-wrap items-center justify-center p-5 gap-8">
          {Object.entries(CafeTagTypes).map(([key, value], index) => (
            <Tag
              key={key}
              tagText={value}
              isSelected={selected === index}
              onClick={() => handleSelectTag(index)}
              className="cursor-pointer"
            />
          ))}
        </div>

        {/* 카페 카드들 */}
        {filteredCafes.length === 0 ? (
          <p className="flex justify-center items-center w-[960px]">해당 태그를 가진 카페가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-3 gap-[30px]">
            {filteredCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} cafeKey={cafe.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CafeResultsList;
