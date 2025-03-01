import ContentBox from "../components/common/ContentBox"
import Tag from "../components/common/Tag"
import cafeImage from "../assets/images/home-pg-img.jpg"
import pokemonImage from "../assets/images/pokemon-img.jpg"
import ContentLayout from "../components/layout/ContentLayout"

const CafeResultsList = () => {








  return (
    <ContentLayout>
      <div className="bg-yellow-300 flex flex-row items-center justify-center p-5 gap-5 w-full ">
        {/* 여기 map사용해서 enum 태그들 가져오기 */}
        <Tag tagText={"안녕"}/>
        <Tag tagText={"이거너무긴태그인가"}/>
        <Tag tagText={"짧은태그"}/>
        <Tag tagText={"고양이고양이냠냠동글동글"}/>
      </div>
          <div className="grid grid-cols-3 gap-[30px]">
            <ContentBox/>
            <ContentBox/>
            <ContentBox/>
          </div>
    </ContentLayout>
  )
}

export default CafeResultsList;


{/* <div className="flex flex-row w-3/5 overflow-auto max-h-screen">
<ContentBox className={"bg-blue-100 grid grid-rows-1 row-span-full"}>
  <div className="w-full min-h-screen grid gap-2">
    <img src={cafeImage} />
    <img src={pokemonImage} />
  </div>
</ContentBox>
<ContentBox className={"bg-yellow-100"}>
  <div className="w-full min-h-screen grid gap-2">
    <img src={pokemonImage} />
    <img src={cafeImage} />
    <img src={pokemonImage} />
    <img src={cafeImage} />
  </div>
</ContentBox>
<ContentBox className={"bg-red-100"}>
  <div className="w-full min-h-screen grid gap-2">
    <img src={cafeImage} />
    <img src={pokemonImage} />
  </div>
</ContentBox>
</div> */}



