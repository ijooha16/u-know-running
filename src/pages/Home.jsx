import cafeImage from "../assets/images/home-pg-img.jpg";
import Map from "../components/common/Map";
import ContentLayout from "../components/layout/ContentLayout";
import Button from "../components/common/Button";

const Home = () => {
  return (
    <ContentLayout>
      <div className="w-full min-h-screen flex flex-row justify-center items-center">
        {/* 좌측 슬로건 & 버튼 */}
        <div className="w-2/5 min-h-screen relative gap-16">
          <h1 className="text-[4vw] leading-normal font-black absolute left-10 top-1/3 transform -translate-y-1/3">
            Stay Motivated, <br /> Stay Caffeinated
          </h1>
          <div className="absolute left-10 md:top-2/3 md:transform -translate-y-2/3 sm:top-1/2 sm:transform sm:-translate-y-1/2">
            <Button text={"오늘의 카페 찾으러 가기"} />
          </div>
        </div>

        {/* 우측 지도 & 사진 카드 */}
        <div className="w-2/5 min-h-screen relative">
          <div className="w-[20vw] min-w-[15vw] h-[75vh] rounded-3xl z-0 absolute left-16 top-16 overflow-hidden drop-shadow-lg">
            <Map />
          </div>
          <div className="w-[20vw] min-w-[15vw]  h-[75vh] rounded-3xl z-10 absolute left-56 top-28 overflow-hidden drop-shadow-lg">
            <img src={cafeImage} alt="카페 이미지" className="w-full h-full" />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Home;
