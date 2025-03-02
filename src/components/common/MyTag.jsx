import { useState } from "react";
import { CafeTagTypes } from "../../data/CafeTypes";
import Tag from "./Tag";
import { Fragment } from "react";
import useTagStore from "../../stores/useTagStore";

const MyTag = () => {
  const [showOptions, setShowOptions] = useState(true);
  const { selectedTag, setSelectedTag } = useTagStore();

  return (
    <>
      <div
        onClick={() => setShowOptions(true)}
        className="flex items-center h-[40px] px-[16px] border-[3px] bg-[#8080ff22] border-[#8080ff] font-medium rounded-full"
      >
        # {selectedTag}
      </div>

      {showOptions && (
        <div className="absolute flex flex-col gap-[12px] items-start bg-[#00000075] rounded-[20px] p-[16px_10px]">
          {Object.entries(CafeTagTypes).map((type) => (
            <Fragment key={type[0]}>
              <Tag
                tagText={type[1]}
                onClick={() => {
                  setSelectedTag(type[1]);
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
