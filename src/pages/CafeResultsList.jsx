import ContentBox from "../components/common/ContentBox";
import Tag from "../components/common/Tag";
import { CafeTagTypes } from "../data/CafeTypes";
import cafeImage from "../assets/images/home-pg-img.jpg";
import pokemonImage from "../assets/images/pokemon-img.jpg";
import ContentLayout from "../components/layout/ContentLayout";
import CafeCard from "../components/CafeCard"; // ContentBox 대신 CafeCard를 쓰고 싶은데 지금 api 연결이 안돼서 못하는 중

const CafeResultsList = () => {


  return (
    <ContentLayout>
      <div className="flex flex-row items-center p-5 gap-5 w-[960px] overflow-x-auto whitespace-nowrap [&>*]:text-white [&>*]:bg-[#191970] [&>*]:hover:cursor-pointer [&>*]:active:bg-[#3434a7]">
        {/* 여기 map사용해서 enum 태그들 가져오기 */}
        {Object.entries(CafeTagTypes).map(([key, value]) => (
          <Tag key={key} tagText={value} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-[30px] mx-auto w-fit mt-5">
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
        <CafeCard />
      </div>
    </ContentLayout>
  );
};

export default CafeResultsList;