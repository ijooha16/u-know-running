import React, { useEffect, useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
// import axios from "axios";
import supabase from "../services/supabase";
import ContentLayout from "../components/layout/ContentLayout";
// import CafeCard from "../components/CafeCard";
import useCafeStore from "../stores/useCafeStore";

const Mypage = () => {
  // 프로필 이미지 상태 관리
  const [profileImg, setProfileImg] = useState(null);
  // 프로필 수정 여부 관리 (수정/수정 완료 버튼 토글)
  const [isEdit, setIsEdit] = useState(false);
  // 사용자 정보 상태 (이름, mbti, 성별, 이메일)
  const [userInfo, setUserInfo] = useState({
    name: "",
    mbti: "",
    gender: "",
    email: ""
  });
  // 북마크, 태그 탭 전환 상태
  const [conversionTab, setConversionTab] = useState("bookmark");
  const { cafes } = useCafeStore(); // 카페 데이터를 가져오는 스토어

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      // 로그인된 사용자 정보 가져오기
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
        return;
      }

      const userId = authUser.user.id;
      console.log("userId:", userId); // userId 확인

      // 'users' 테이블에서 해당 사용자 정보 가져오기
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("nickname, mbti, gender, email")
        .eq("users_uid", userId) // 유저 아이디로 필터링
        .single(); // .single()을 사용하여 하나의 객체만 반환

      if (userError) {
        console.error("사용자 정보를 가져오는 데 실패했습니다.", userError.message);
        return;
      }

      if (userData) {
        // 사용자 정보를 state에 저장
        setUserInfo({
          nickname: userData.nickname || "",
          mbti: userData.mbti || "미등록", // 없으면 기본값 '미등록' 표시
          gender: userData.gender || "미등록", // 없으면 기본값 '미등록' 표시
          email: userData.email || ""
        });
      } else {
        console.error("사용자 정보가 없습니다.");
      }
    };

    fetchUser(); // 사용자 정보 가져오기 실행
  }, []);

  // 프로필 이미지 변경 핸들러
  const handleProfileImgChange = (e) => {
    const file = e.target.files[0]; // 파일 선택
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // 이미지 읽어오기 완료 후 state 업데이트
      };
      reader.readAsDataURL(file); // 이미지를 data URL로 읽기
    }
  };

  // 수정 버튼 클릭 시 동작하는 함수 (수정 완료 및 수정 상태 토글)
  const toggleEdit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // 수정 완료 클릭 시, 변경된 데이터를 Supabase에 저장
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
        return;
      }

      const userId = authUser.user.id;

      // 'users' 테이블에서 유저 정보 업데이트
      const { error: updateError } = await supabase
        .from("users")
        .update({
          nickname: userInfo.nickname,
          mbti: userInfo.mbti,
          gender: userInfo.gender,
          email: userInfo.email
        })
        .eq("users_uid", userId);

      if (updateError) {
        console.error("사용자 정보를 업데이트하는 데 실패했습니다.", updateError.message);
      } else {
        console.log("사용자 정보가 성공적으로 업데이트되었습니다.");
      }
    }

    // 수정 상태 토글 (수정하기 / 수정 완료)
    setIsEdit((prev) => !prev);
  };

  // 탭 변경 핸들러 (북마크, 태그 탭 전환)
  const handleTab = (tab) => {
    setConversionTab(tab);
  };

  return (
    <ContentLayout>
      <div className="flex p-8">
        {/* 왼쪽 영역: 프로필 수정 */}
        <div className="w-1/3 pr-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
            <form>
              <div className="mb-[20px]">
                <ContentBox>
                  <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4">
                    {/* 프로필 이미지 표시 (없으면 기본 이미지 사용) */}
                    <img
                      src={profileImg || null} // 프로필 이미지가 없으면 기본 이미지 사용
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImgChange} // 이미지 변경 핸들러 연결
                    className={`${isEdit ? "block" : "hidden"}`} // 수정 모드에서만 이미지 변경 가능
                  />
                  {/* 이름 입력 */}
                  <Input
                    type="text"
                    placeholder="이름"
                    value={userInfo.nickname || ""} // 닉네임 값 반영
                    onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })} // 수정 시 닉네임 업데이트
                    className="border"
                    disabled={!isEdit} // 수정 모드일 때만 입력 가능
                  />
                </ContentBox>
              </div>
              <div className="mb-[20px]">
                <ContentBox className="border p-4 rounded-lg mb-4">
                  {/* MBTI, Gender, Email 입력 */}
                  <Input
                    type="text"
                    placeholder="MBTI"
                    value={userInfo.mbti || ""} // MBTI 값 반영
                    onChange={(e) => setUserInfo({ ...userInfo, mbti: e.target.value })} // 수정 시 MBTI 업데이트
                    className="border mb-4"
                    disabled={!isEdit} // 수정 모드일 때만 입력 가능
                  />
                  <Input
                    type="text"
                    placeholder="Gender"
                    value={userInfo.gender || ""} // 성별 값 반영
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} // 수정 시 성별 업데이트
                    className="border mb-4"
                    disabled={!isEdit} // 수정 모드일 때만 입력 가능
                  />
                  <Input
                    type="email"
                    placeholder="test@google.com"
                    value={userInfo.email || ""} // 이메일 값 반영
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} // 수정 시 이메일 업데이트
                    className="border mb-4"
                    disabled={!isEdit} // 수정 모드일 때만 입력 가능
                  />
                </ContentBox>
              </div>
              <div className="text-center ml-[140px]">
                {/* 수정 버튼: 수정하기 / 수정 완료 */}
                <Button type="Button" onClick={toggleEdit} text={isEdit ? "수정 완료" : "수정하기"} />
              </div>
            </form>
          </div>
        </div>

        {/* 오른쪽 영역: 북마크된 콘텐츠 및 조건부 랜더링 */}
        <div className="ml-[10px] mt-[40px]">
          <ContentBox className="ml-[150px] gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Tab</h2>
              <div className="flex gap-4 mb-4">
                {/* 탭 버튼: 북마크 / 태그 */}
                <Button
                  type="button"
                  onClick={() => handleTab("bookmark")}
                  text="Bookmark"
                  className={`px-4 py-2 border-none ${conversionTab === "bookmark" ? "bg-blue-500 text-black" : ""}`}
                ></Button>
                <div className="border-r border-gray-300"></div>
                <Button
                  type="button"
                  onClick={() => handleTab("tag")}
                  text="Tag"
                  className={`px-4 py-2 border-none ${conversionTab === "tag" ? "bg-blue-500 text-black" : ""}`}
                />
              </div>

              {/* 북마크 탭일 경우 콘텐츠 표시 */}
              {conversionTab === "bookmark" ? (
                <div className="grid grid-cols-2 gap-4">
                  <p>북마크1</p>
                  <p>북마크1</p>
                  {/* 카페 목록을 표시할 예정 */}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {/* 태그 관련 콘텐츠 */}
                  <p>태그1</p>
                  <p>태그1</p>
                </div>
              )}
            </div>
          </ContentBox>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Mypage;
