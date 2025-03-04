import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import MainTag from "../components/common/MainTag";
import MyTag from "../components/common/MyTag";
import Tag from "../components/common/Tag";
import Modal from "../components/Modal";
import useCafeStore from "../stores/useCafeStore";
import { useState, useEffect } from "react";
import { fetchNaverImage } from "../services/naverimage";
import ContentLayout from "../components/layout/ContentLayout";
import { useGetCafeTopTags } from "../tanstack/queries/useGetCafeTags";

const CafeDetail = () => {
  const { selectedCafe, setSelectedCafe } = useCafeStore();
  const { id: cafe_id, place_name, road_address_name, address_name, phone, place_url } = selectedCafe;
  const [image, setImage] = useState("");
  const { data: tagList, isLoading, error } = useGetCafeTopTags(cafe_id);
  const [isLoaded, setIsLoaded] = useState(true);

  console.log(image);

  useEffect(() => {
    const loadPreview = async () => {
      const imgUrl = await fetchNaverImage(place_name);
      setImage(imgUrl || null); // 기본 이미지 설정 가능
    };

    loadPreview();
  }, [place_name]);

  if (!selectedCafe) return null;

  if (isLoading) return <div>태그 로딩중..</div>;
  if (error) return <div>태그 불러오기 실패</div>;

  return (
    <div
      onClick={() => setSelectedCafe(null)}
      className="z-50 fixed flex justify-center top-0 left-0 w-screen h-screen bg-[#000000a8]"
    >
      <ContentLayout>
        <Modal>
          <div className="flex gap-[30px]">
            <div className="flex flex-wrap max-w-[500px] min-h-[320px]">
              {image &&
                image.map((image, idx) => {
                  if (idx >= 5) return;
                  return (
                    <img
                      key={image.link}
                      src={image.thumbnail}
                      alt=""
                      onError="this.onerror=null; this.src=''; this.style.display='none'"
                    />
                  );
                })}
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="w-[400px] flex flex-col gap-[16px] py-[16px] items-start">
                <div className="w-full flex flex-col items-start">
                  <div className="flex justify-between w-full items-center pr-[12px]">
                    <MainTag tagText={tagList[0]?.tag || "아무 태그도 등록되지 않았어요"} />
                    <Icon icon="bookMark" />
                  </div>
                  <div className="font-semibold text-[26px] pl-[12px] mt-[10px]">{place_name || "이름없음"}</div>
                  <div className="text-darkgray text-[14px] pl-[12px]">{address_name || road_address_name}</div>
                  <div className="text-darkgray text-[14px] pl-[12px]">{phone || "번호없음"}</div>
                </div>
                <div className="flex gap-[12px] w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {tagList?.map((tag, idx) => {
                    if (idx === 0) return null;
                    return <Tag key={tag.tag} tagText={`${tag.tag} - ${tag.count}`} />;
                  })}
                </div>
                <MyTag />
              </div>
              <a href={place_url} target="_blank" rel="noopener noreferrer">
                <Button text="웹사이트 바로가기" />
              </a>
            </div>
          </div>
        </Modal>
      </ContentLayout>
    </div>
  );
};

export default CafeDetail;

const Img = ({ img }) => {
  const [isLoaded, setIsLoaded] = useState(true);

  return isLoaded ? <img src={img} alt="이미지가 없습니다" onError={() => setIsLoaded(false)} /> : null;
};
