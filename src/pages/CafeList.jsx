import CafeCard from "../components/CafeCard";
import ContentLayout from "../components/layout/ContentLayout";

const CafeList = () => {
  return (
    <ContentLayout>
      {/* 랜더링 시 맵을 이용하는바람에 컬럼 1개당 3개씩 묶여있어 일단 flex로 임시 수정 grid로 변경해야할시 div flex 주석 후 아래의 grid 주석 해제 */}
      <div className="flex flex-wrap gap-[30px] justify-start">
        {/* <div className="grid grid-cols-3 gap-[30px]"> */}
        <CafeCard />
        {/* 임시 더미데이터를 넣어서 랜더링 시 9개가나와 주석처리함 */}
        {/* <CafeCard />
        <CafeCard /> */}
      </div>
    </ContentLayout>
  );
};

export default CafeList;
