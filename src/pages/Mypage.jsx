import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";

const Mypage = () => {
  // 프로필 이미지 상태
  const [profileImg, setProfileImg] = useState(null);
  // 프로필 데이터 수정 여부
  const [isEdit, setIsEdit] = useState(false);

  // 프로필 이미지 변경
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file); // 이미지를 data URL로 읽기
    }
  };

  // 수정 버튼
  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="flex p-8">
      {/* 왼쪽 영역: 프로필 수정 */}
      <div className="w-1/3 pr-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
          <form>
            <ContentBox className="mb-4">
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4">
                {/* profileImg가 없다면 기본 이미지 사용 */}
                <img
                  src={profileImg || null} // 프로필 이미지가 없으면 기본 이미지 사용
                  className="w-full h-full object-cover"
                />
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleProfileImgChange}
                className={`${isEdit ? "block" : "hidden"}`}
              />
              <Input type="text" placeholder="이름" className="border mb-4 mt-4" disabled={!isEdit} />
            </ContentBox>
            <ContentBox className="border p-4 rounded-lg mb-4">
              <Input type="text" placeholder="MBTI" className="border  mb-4" disabled={!isEdit} />
              <Input type="text" placeholder="Gender" className="border  mb-4" disabled={!isEdit} />
              <Input type="email" placeholder="test@google.com" className="border mb-4" disabled={!isEdit} />
            </ContentBox>
            <Button type="Button" onClick={toggleEdit} text={isEdit ? "수정 완료" : "수정하기"}></Button>
          </form>
        </div>
      </div>

      {/* 오른쪽 영역: 북마크된 콘텐츠, 조건부 랜더링 예정 */}
      <ContentBox className="ml-[150px] gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">북마크한 콘텐츠</h2>
          {/* 한 줄에 3개씩 (grid 사용) */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border p-4 rounded-md">
              <p>카페 1</p>
            </div>
            <div className="border p-4 rounded-md">
              <p>카페 2</p>
            </div>
            <div className="border p-4 rounded-md">
              <p>카페 3</p>
            </div>
            <div className="border p-4 rounded-md">
              <p>카페 4</p>
            </div>
            <div className="border p-4 rounded-md">
              <p>카페 5</p>
            </div>
            <div className="border p-4 rounded-md">
              <p>카페 6</p>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
};

export default Mypage;
