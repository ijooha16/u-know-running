import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a0584869f103abd67541ffd1e3aca0e&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 기준 좌표
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default Map;
