import cafeImage from '../assets/images/home-pg-img.jpg'; // 이미지 파일을 import

const Home = () => {
  return (
    <div className="w-screen min-h-screen flex flex-row justify-center items-center">
      <div className="w-2/5 min-h-screen relative gap-16">
        <h1 className="text-[4vw] leading-normal font-black absolute left-10 top-1/3 transform -translate-y-1/3">Stay Motivated, <br /> Stay Caffeinated</h1>
        <button className="bg-yellow-400 py-3 px-5 rounded-lg font-semibold text-[2vw] absolute left-10 md:top-2/3 md:transform -translate-y-2/3 sm:top-1/2 sm:transform sm:-translate-y-1/2">오늘의 카페 찾으러 가기</button>
      </div>
      <div className="w-2/5 min-h-screen relative">
        <div className="w-[20vw] min-w-[15vw] h-[75vh] rounded-3xl z-0 absolute left-16 top-16 overflow-hidden drop-shadow-lg">
          <img src="" alt="지도 이미지" className="bg-gray-400 w-full h-full"/>
        </div>
        <div className="w-[20vw] min-w-[15vw]  h-[75vh] rounded-3xl z-10 absolute left-56 top-28 overflow-hidden drop-shadow-lg">
          <img src={cafeImage} alt="카페 이미지" className="w-full h-full"/>
        </div>
      </div>
    </div>
  );
};



export default Home;

// <div className="w-[900px] h-[70vh] rounded-xl overflow-hidden">
//           <div className="bg-gray-400 w-full h-full">cafe img</div>{/* <img src="" alt="지도" /> */}
//         </div>

// <div className="border h-[70vh] rounded-3xl overflow-hidden absolute z-10">
//           <img src="../public/home-pg-img.jpg" alt="카페 이미지" className="w-full h-full"/>
//         </div>