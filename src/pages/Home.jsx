import { Link } from "react-router-dom";
import cafeImage from "../assets/images/home-pg-img.jpg"; // 이미지 파일을 import
import ContentLayout from "../components/layout/ContentLayout";
import Button from "../components/common/Button";
import KakaoCafeMap from "../components/KakaoCafeMap";
import useUserStore from "../stores/useUserStore";

const Home = () => {
  const { userData } = useUserStore();

  return (
    <>
      {userData ? (
        <div className="w-screen h-screen">
          <Link to="/cafe-results-list">
            <Button icon="hamburger_white" text="목록으로 보기" className="fixed bottom-[40px] right-[40px]" />
          </Link>
          <KakaoCafeMap width="100vw" height="100vh" />
        </div>
      ) : (
        <ContentLayout>
          <div className="w-full min-h-screen flex flex-row justify-center items-center">
            <div className="w-2/5 min-h-screen relative gap-16">
              <h1 className="text-[4vw] leading-normal font-black absolute left-10 top-1/3 transform -translate-y-1/3">
                Stay Motivated, <br /> Stay Caffeinated
              </h1>
              <Link
                to="/log-in"
                className="absolute left-10 md:top-2/3 md:transform -translate-y-2/3 sm:top-1/2 sm:transform sm:-translate-y-1/2"
              >
                <Button text={"오늘의 카페 찾으러 가기"} />
              </Link>
            </div>
            <div className="w-2/5 min-h-screen relative">
              <div className="w-[20vw] min-w-[15vw] h-[75vh] rounded-3xl z-0 absolute left-16 top-16 overflow-hidden drop-shadow-lg">
                <KakaoCafeMap width="100vw" height="100vh" />
              </div>
              <div className="w-[20vw] min-w-[15vw]  h-[75vh] rounded-3xl z-10 absolute left-56 top-28 overflow-hidden drop-shadow-lg">
                <img src={cafeImage} alt="카페 이미지" className="w-full h-full" />
              </div>
            </div>
          </div>
        </ContentLayout>
      )}
    </>
  );
};

export default Home;
