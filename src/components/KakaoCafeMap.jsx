import { useKakaoLoader, Map, MapMarker } from "react-kakao-maps-sdk";
import useGetLocation from "../tanstack/queries/useGetLocation";
import useGetCafes from "../tanstack/queries/useGetCafes";
import CafeDetail from "../pages/CafeDetail";
import useCafeStore from "../stores/useCafeStore";

const KakaoCafeMap = ({ width, height }) => {
  const { data: position, isLoading: isLocationLoading, error: locationError } = useGetLocation();
  const { selectedCafe, setSelectedCafe, cafes } = useCafeStore();

  const { isLoading: isCafesLoading, error: cafesError } = useGetCafes(position?.lat, position?.lng);

  const [loading, loadError] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
    libraries: ["services"]
  });

  if (loading || isLocationLoading || isCafesLoading) return <p>지도 로딩 중...</p>;
  if (locationError || cafesError || loadError) return <p>지도 로딩 오류 발생</p>;

  return (
    <div className="relative">
      <Map center={position} style={{ width: `${width}`, height: `${height}` }} level={3}>
        {/* 현재 위치 마커 */}
        {position && <MapMarker position={position} title="내 위치" />}

        {/* 카페 마커 표시 */}
        {cafes.map((cafe) => (
          <MapMarker
            key={cafe.id}
            position={{ lat: parseFloat(cafe.y), lng: parseFloat(cafe.x) }}
            title={cafe.place_name}
            onClick={() => setSelectedCafe(cafe)}
          />
        ))}
      </Map>

      {/* 마커 클릭 시 모달창 표시 */}
      {selectedCafe && <CafeDetail cafe={selectedCafe} onClose={() => setSelectedCafe(null)} />}
    </div>
  );
};

export default KakaoCafeMap;
