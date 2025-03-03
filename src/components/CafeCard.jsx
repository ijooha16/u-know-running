// import useCafeStore from "../stores/useCafeStore";
import Icon from "./common/Icon";
import MainTag from "./common/MainTag";
import { useEffect, useState } from "react";
import { getCafeTopTags } from "../services/tag";  // getCafeTopTags 함수 가져오기
import { fetchNaverImage } from "../services/naverimage";
import useCafeStore from "../stores/useCafeStore";


const CafeCard = ({cafe, cafeKey}) => {
  const { place_name, address_name, road_address_name, id: cafeId } = cafe;
  const [tags, setTags] = useState([]); // 태그 상태

  const [image, setImage] = useState("");

  console.log(cafe);
  useEffect(() => {
    const loadPreview = async () => {
      const imgUrl = await fetchNaverImage(place_name);
      setImage(imgUrl || null); // 기본 이미지 설정 가능
      console.log("image==> ", imgUrl);
    };
    loadPreview();
  }, [place_name]);

  

  useEffect(() => {
    // 카페의 ID에 맞는 태그를 가져오기
    const fetchTags = async () => {
      try {
        const topTags = await getCafeTopTags(cafeId);
        setTags(topTags.map(tag => tag.tag));  // 상위 4개의 태그만 사용
      } catch (error) {
        console.error("태그 가져오기 오류:", error);
      }
    };    
    if (cafeId) {
      fetchTags();
    }
  }, [cafeId]);  // cafeId가 변경될 때마다 태그를 가져옵니다.
  console.log(image);

  if (!cafe) {
    return null; // cafe가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div key={cafeKey} className={`shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-auto w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]`}>
      <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
        <img src={image} className="w-full h-full"/>
        <div className="flex justify-between w-full items-center pr-[12px]">
          {/* <MainTag tagText="혼자 공부하기 좋은" /> */}
          {tags.length > 0 ? (
            tags.map((tag, index) => <MainTag key={index} tagText={tag} />)
          ) : (
            <MainTag tagText="혼자 공부하기 좋은" /> // 기본 태그
          )}
          <Icon icon="bookMark" />
        </div>
        <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
        <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
      </div>
    </div>
  );
};


export default CafeCard;


// 내(수민)가 3/2 4시반에 건들이기 전 원래 내용
// // import useCafeStore from "../stores/useCafeStore";
// import Icon from "./common/Icon";
// import MainTag from "./common/MainTag";


// const CafeCard = () => {
//   // const { selectedCafe } = useCafeStore();
//   // const { place_name, road_address_name, address_name, phone, place_url } = selectedCafe;
//   const place_name = "컴포즈 커피 부천점";
//   const address_name = "여월동 사단지 어쩌고 길주로";
//   const road_address_name = "d";


//   return (
//     <div className="shadow bg-[url(https://www.thinkfood.co.kr/news/photo/202007/88177_114044_267.jpg)] h-full w-[300px] flex flex-col items-center gap-[16px] text-white rounded-[20px]">
//       <div className="bg-gradient-to-t from-[#000000d7] to-[#0000003e] min-h-[300px] w-full flex flex-col justify-end items-start p-[20px_16px] rounded-[20px]">
//         <div className="flex justify-between w-full items-center pr-[12px]">
//           <MainTag tagText="혼자 공부하기 좋은" />
//           <Icon icon="bookMark" />
//         </div>
//         <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name}</div>
//         <div className="text-lightgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
//       </div>
//     </div>
//   );
// };


// export default CafeCard;


//////////////////----------3/3 7/30pm


