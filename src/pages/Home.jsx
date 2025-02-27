const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-row justify-center items-center gap-48 font-inter">
      <div className='flex flex-col justify-center items-center gap-20'>
        <h1 className="text-5xl leading-relaxed font-black">Stay Motivated, <br/> Stay Caffeinated</h1>
        <button className="bg-yellow-400 p-5 rounded-lg font-semibold">오늘의 카페 찾으러 가기</button>
      </div>
      <div className="min-h-screen w-1/3 flex flex-row justify-center items-center">
        <div className="border h-[70vh] rounded-3xl overflow-hidden absolute">
          <img src="../public/home-pg-img.jpg" alt="카페 이미지" className="w-full h-full"/>
        </div>
        <div className="border h-[70vh] rounded-3xl overflow-hidden absolute z-10">
          <img src="../public/home-pg-img.jpg" alt="카페 이미지" className="w-full h-full"/>
        </div>
      </div>
    </div>
  )
};

export default Home;

// <div className="w-[900px] h-[70vh] rounded-xl overflow-hidden">
//           <div className="bg-gray-400 w-full h-full">cafe img</div>{/* <img src="" alt="지도" /> */}
//         </div>