import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
import supabase from "../services/supabase";
import ContentLayout from "../components/layout/ContentLayout";
import { useUserInfo } from "../tanstack/queries/useUserInfo";
import useUserStore from "../stores/useUserStore";
import { useUpdateUserInfo } from "../tanstack/mutations/useUpdateUserInfo";

const Mypage = () => {
  const [profileImg, setProfileImg] = useState(null); // 프로필 이미지 상태 관리
  const [isEdit, setIsEdit] = useState(false); // 프로필 수정 여부 관리 (수정/수정 완료 버튼 토글)
  const [conversionTab, setConversionTab] = useState("bookmark"); // 북마크 / 태그 탭 전환
  const { userData, setUserData } = useUserStore();
  const { data: userInfo, isLoading: userLoading, isError: userError } = useUserInfo(); // 사용자 정보 가져오기
  const [editableUserInfo, setEditableUserInfo] = useState(userInfo); // 수정 가능한 사용자 정보 상태
  const { mutate: updateUserInfo } = useUpdateUserInfo();

  useEffect(() => {
    if (userInfo) {
      setProfileImg(userInfo.profile_image); // 프로필 이미지 설정
      setEditableUserInfo(userInfo); // userInfo 변경 시 수정 가능한 정보 업데이트
    }
  }, [userInfo]);

  // 프로필 이미지 변경 핸들러
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // 이미지 읽어오기 완료 후 state 업데이트
      };
      reader.readAsDataURL(file);
    }
  };

  // 수정 버튼 클릭 시 동작하는 함수 (수정 완료 및 수정 상태 토글)
  const toggleEdit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
        return;
      }

      const userId = authUser.user.id;
      updateUserInfo({ userId, updatedData: editableUserInfo });
    }

    setIsEdit((prev) => !prev);

    // 탭 변경 핸들러
    const handleTab = (tab) => {
      setConversionTab(tab);
    };

    return (
      <ContentLayout>
        <div className="flex gap-[30px] justify-start">
          {/* 왼쪽 영역: 프로필 수정 */}
          <form>
            <div className="flex flex-col gap-[30px] justify-center items-center">
              <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
              <ContentBox>
                <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4">
                  {/* 프로필 이미지 표시 */}
                  <img
                    src={profileImg || "/path/to/default/image.jpg"} // 프로필 이미지 없으면 기본 이미지
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImgChange}
                  className={`${isEdit ? "block" : "hidden"}`} // 수정 모드에서만 이미지 변경 가능
                />
                {/* 이름 입력 */}
                <Input
                  type="text"
                  placeholder="이름"
                  value={editableUserInfo?.nickname || ""} // 수정 가능한 상태에서 닉네임 값 반영
                  onChange={(e) => setEditableUserInfo({ ...editableUserInfo, nickname: e.target.value })}
                  className="border"
                  disabled={!isEdit} // 수정 모드일 때만 입력 가능
                />
              </ContentBox>
              <ContentBox>
                {/* MBTI, Gender, Email 입력 */}
                <Input
                  type="text"
                  placeholder="MBTI"
                  value={editableUserInfo?.mbti || ""}
                  onChange={(e) => setEditableUserInfo({ ...editableUserInfo, mbti: e.target.value })}
                  className="border mb-4"
                  disabled={!isEdit}
                />
                <Input
                  type="text"
                  placeholder="Gender"
                  value={editableUserInfo?.gender || ""}
                  onChange={(e) => setEditableUserInfo({ ...editableUserInfo, gender: e.target.value })}
                  className="border mb-4"
                  disabled={!isEdit}
                />
                <Input
                  type="email"
                  placeholder="test@google.com"
                  value={editableUserInfo?.email || ""}
                  onChange={(e) => setEditableUserInfo({ ...editableUserInfo, email: e.target.value })}
                  className="border mb-4"
                  disabled={!isEdit}
                />
              </ContentBox>
              {/* 수정 버튼 */}
              <Button type="Button" onClick={toggleEdit} text={isEdit ? "수정 완료" : "수정하기"} />
            </div>
          </form>

          {/* 오른쪽 영역: 북마크된 콘텐츠 및 조건부 랜더링 */}
          <div className="flex flex-col gap-[30px] justify-start items-center">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleTab("bookmark")}
                className={`${conversionTab === "bookmark" ? "text-black font-bold text-[24px]" : "text-darkgray"}`}
              >
                북마크
              </button>
              <button
                type="button"
                onClick={() => handleTab("tag")}
                className={`${conversionTab === "tag" ? " text-black font-bold text-[24px]" : "text-darkgray"}`}
              >
                태그
              </button>
            </div>
            <div className="w-[630px] bg-white p-6 rounded-lg shadow-lg">
              {conversionTab === "bookmark" ? (
                <div className="grid grid-cols-2 gap-4">
                  <p>북마크된 카페가 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <p>태그가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentLayout>
    );
  };
};

export default Mypage;
