import React, { useState } from "react";

const Mypage = () => {
  // 프로필 이미지 상태
  const [profileImg, setProfileImg] = useState("");
  // 프로필 데이터 수정 여부
  const [isEdit, setIsEdit] = useState(false);

  // 프로필 이미지 변경
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); // FileReader 사용
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
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
            <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4">
              {/* 프로필 이미지가 없으면 디폴트 이미지 표시 현재는 디폴트값 없음  */}
              <img src={profileImg} alt="" className="w-full h-full object-cover" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImgChange} // 이미지 선택 시 실행
              className={`w-full p-2 border ${isEdit ? "block" : "hidden"}`}
            />
            <input type="text" placeholder="이름" className="border p-2 w-full mb-4 mt-4" disabled={!isEdit} />
            <input type="text" placeholder="MBTI" className="border p-2 w-full mb-4" disabled={!isEdit} />
            <input type="text" placeholder="Gender" className="border p-2 w-full mb-4" disabled={!isEdit} />
            <input type="email" placeholder="test@google.com" className="border p-2 w-full mb-4" disabled={!isEdit} />
            <button type="button" onClick={toggleEdit} className="bg-blue-500 text-white p-2 w-full">
              {isEdit ? "수정 완료" : "수정하기"}
            </button>
          </form>
        </div>
      </div>

      {/* 오른쪽 영역: 북마크된 콘텐츠, 조건부 랜더링 예정 */}
      <div className="w-2/3">
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
      </div>
    </div>
  );
};

export default Mypage;
