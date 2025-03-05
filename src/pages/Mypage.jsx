import { useState, useEffect } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
import supabase from "../services/supabase";
import ContentLayout from "../components/layout/ContentLayout";
import { useUserInfo } from "../tanstack/queries/useUserInfo";
import useUserStore from "../stores/useUserStore";
import { useUpdateUserInfo } from "../tanstack/mutations/useUpdateUserInfo";
import { useUserBookmarks } from "../tanstack/queries/useUserBookmarks";
import CafeCard from "../components/CafeCard";
import { useGetUserTopTags } from "../tanstack/queries/useGetUserTopTags";
import MainTag from "../components/common/MainTag";

const Mypage = () => {
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setpreviewImg] = useState("");

  const [isEdit, setIsEdit] = useState(false); // 프로필 수정 모드 여부
  const [conversionTab, setConversionTab] = useState("bookmark"); // 탭 전환: "bookmark" or "tag"

  const { userData } = useUserStore();

  const { data: userInfo, isLoading: userLoading, isError: userError } = useUserInfo();
  const [editableUserInfo, setEditableUserInfo] = useState(userInfo);
  const { mutate: updateUserInfo } = useUpdateUserInfo();

  // userInfo가 업데이트되면 프로필 이미지와 편집 가능한 정보 업데이트
  useEffect(() => {
    if (userInfo) {
      setProfileImg(userInfo.profile_image);
      setEditableUserInfo(userInfo);
    }
  }, [userInfo]);

  // 프로필 이미지 변경 핸들러
  const handleProfileImgChange = (e) => {
    const inputFile = e.target.files;
    if (!inputFile) {
      return;
    } else {
      setpreviewImg(URL.createObjectURL(inputFile[0]));
      setProfileImg(inputFile[0]);
    }
  };

  const uploadFileAndGetUrl = async () => {
    if (!profileImg || !userData.id) return null;
    const filePath = `users profile/${crypto.randomUUID()}_${profileImg.lastModified}`;

    const { error: uploadError } = await supabase.storage.from("users profile").upload(filePath, profileImg);
    if (uploadError) {
      console.error("파일 업로드 에러:", uploadError);
      return;
    }

    const { data, error } = supabase.storage.from("users profile").getPublicUrl(filePath);
    if (error) {
      console.error("public URL 가져오기 에러:", error);
      return;
    }
    return data.publicUrl;
  };

  // 수정 버튼 핸들러
  const toggleEdit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      // 프로필 이미지가 변경되었으면 업로드 진행
      let imageUrl = editableUserInfo.profile_image; // 기존 URL 유지
      if (profileImg) {
        const uploadedUrl = await uploadFileAndGetUrl();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      // 업데이트할 데이터에 새로운 이미지 URL 반영
      const updatedData = {
        ...editableUserInfo,
        profile_image: imageUrl
      };

      // 수정 완료 시 사용자 정보 업데이트
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user) {
        console.error("로그인된 사용자를 가져오는 데 실패했습니다.", authError);
        return;
      }
      const userId = authUser.user.id;
      updateUserInfo({ userId, updatedData });
    }
    setIsEdit((prev) => !prev);
  };

  // 탭 전환 핸들러
  const handleTab = (tab) => {
    setConversionTab(tab);
  };

  // 로그인한 유저의 북마크 데이터 가져오기
  const { data: bookmarks, isLoading: bookmarksLoading, isError: bookmarksError } = useUserBookmarks(userData.id);

  // 로그인한 유저의 태그 데이터 가져오기
  const { data: tagList, isLoading: tagListLoading, isError: tagListError } = useGetUserTopTags(userData.id);

  if (userLoading) return <div>사용자 정보 로딩중...</div>;
  if (userError) return <div>사용자 정보 불러오기 실패</div>;

  return (
    <ContentLayout>
      <div className="flex gap-[30px] justify-start">
        {/* 왼쪽 영역: 프로필 수정 */}
        <form>
          <div className="flex flex-col gap-[30px] justify-center items-center">
            <h2 className="text-xl font-bold mb-4">프로필 수정</h2>
            <ContentBox>
              <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4">
                <img src={previewImg || userInfo.profile_image} className="w-full h-full object-cover" alt="프로필" />
              </div>
              {isEdit && <Input id="fileUpload" type="file" onChange={handleProfileImgChange} />}
              <Input
                type="text"
                placeholder="이름"
                value={editableUserInfo?.nickname || ""}
                onChange={(e) =>
                  setEditableUserInfo({
                    ...editableUserInfo,
                    nickname: e.target.value
                  })
                }
                className="border"
                disabled={!isEdit}
              />
            </ContentBox>
            <ContentBox>
              <Input
                type="text"
                placeholder="MBTI"
                value={editableUserInfo?.mbti || ""}
                onChange={(e) =>
                  setEditableUserInfo({
                    ...editableUserInfo,
                    mbti: e.target.value
                  })
                }
                className="border mb-4"
                disabled={!isEdit}
              />
              <Input
                type="text"
                placeholder="Gender"
                value={editableUserInfo?.gender || ""}
                onChange={(e) =>
                  setEditableUserInfo({
                    ...editableUserInfo,
                    gender: e.target.value
                  })
                }
                className="border mb-4"
                disabled={!isEdit}
              />
              <Input
                type="email"
                placeholder="test@google.com"
                value={editableUserInfo?.email || ""}
                onChange={(e) =>
                  setEditableUserInfo({
                    ...editableUserInfo,
                    email: e.target.value
                  })
                }
                className="border mb-4"
                disabled={!isEdit}
              />
            </ContentBox>
            <Button type="button" onClick={toggleEdit} text={isEdit ? "수정 완료" : "수정하기"} />
          </div>
        </form>

        {/* 오른쪽 영역: 북마크 및 태그 탭 */}
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
              className={`${conversionTab === "tag" ? "text-black font-bold text-[24px]" : "text-darkgray"}`}
            >
              태그
            </button>
          </div>
          <div className="w-[630px] bg-white p-6 rounded-lg shadow-lg">
            {conversionTab === "bookmark" ? (
              <div className="grid grid-cols-2 gap-4">
                {bookmarksLoading ? (
                  <p>북마크 로딩중...</p>
                ) : bookmarksError ? (
                  <p>북마크 불러오기 실패</p>
                ) : bookmarks && bookmarks.length > 0 ? (
                  bookmarks.map((bookmark) => <CafeCard key={bookmark.cafe_id} cafe={bookmark} />)
                ) : (
                  <p>북마크된 카페가 없습니다.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {tagListLoading ? (
                  <p>태그 리스트 로딩중...</p>
                ) : tagListError ? (
                  <p>태그 리스트 불러오기 실패</p>
                ) : tagList && tagList.length > 0 ? (
                  tagList.map((tag, idx) => <MainTag key={idx} tagText={tag.tag} variant="tag" />)
                ) : (
                  <MainTag tagText="아무 태그도 등록되지 않았어요." />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Mypage;
