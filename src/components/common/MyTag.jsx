import { useState } from "react";
import { CafeTagTypes } from "../../data/CafeTypes";
import Tag from "./Tag";
import { Fragment } from "react";
import useUpsertTagMutation from "../../tanstack/mutations/useUpsertTagMutation";
import useCafeStore from "../../stores/useCafeStore";
import useUserStore from "../../stores/useUserStore";
import { useGetCafeTagQuery } from "../../tanstack/queries/useGetTags";

const MyTag = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { selectedCafe } = useCafeStore(); // `()` 추가하여 Zustand 상태 호출
  const { userData } = useUserStore();
  const { mutate: upsertTag } = useUpsertTagMutation();
  const { data: cafeData } = useGetCafeTagQuery();
  const filteredCafeTag = cafeData?.filter(data => data.user_uid === userData.user_metadata.sub)
  console.log(filteredCafeTag)

  return (
    <>
      <div
        onClick={() => setShowOptions(true)}
        className="flex items-center h-[40px] px-[16px] border-[3px] bg-[#ffffff36] border-[#ffffffac] font-medium rounded-full"
      >
        # {filteredCafeTag?.length > 0 ? filteredCafeTag[0].tag_type : "태그를 선택해주세요"}
      </div>

      {showOptions && (
        <div className="absolute transform translate-x-full flex flex-col gap-[12px] items-start bg-[#00000075] rounded-[20px] p-[16px_10px]">
          {Object.values(CafeTagTypes).map((type) => (
            <Fragment key={type}>
              <Tag
                tagText={type}
                onClick={() => {
                  upsertTag({ user_uid: userData.id, tag_type: type, cafe_id: selectedCafe.id });
                  setShowOptions(false);
                }}
              />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default MyTag;
