import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
import Icon from "../components/common/Icon";
import Input from "../components/common/Input";
import MainTag from "../components/common/MainTag";
import TabBar from "../components/common/TabBar";
import Tag from "../components/common/Tag";
import ContentLayout from "../components/layout/ContentLayout";

const CafeDetail = () => {
  const tabs = ["탭 1", "탭 2"]
  
  return (
    <div>
      <ContentLayout>
        <ContentBox>
          <Button text="바로가기" />
          <Icon icon='hamburger' />
          <Icon icon='profile' />
          <Icon icon='bookMark' />
          <Input placeholder='닉네임' type='text' />
          <TabBar tabs={tabs} />
          <Tag tagText='혼자 공부하기 좋은' />
          <MainTag tagText='혼자 공부하기 좋은' />
        </ContentBox>
        <ContentBox>
          <Button text="바로가기" />
          <Icon />
          <Input />
          <Tag />
          <MainTag />
        </ContentBox>
      </ContentLayout>
    </div>
  );
};

export default CafeDetail;
