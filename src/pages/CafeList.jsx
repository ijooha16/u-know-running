import CafeCard from "../components/CafeCard";
import ContentLayout from "../components/layout/ContentLayout";

const CafeList = () => {
  return (
    <ContentLayout>
      <div className="grid grid-cols-3 gap-[30px]">
        <CafeCard />
        <CafeCard />
        <CafeCard />
      </div>
    </ContentLayout>
  );
};

export default CafeList;