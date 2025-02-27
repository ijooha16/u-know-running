import React, { useState } from "react";
import { cafeTypes } from "../data/CafeTypes";
import ContentBox from "../components/common/ContentBox";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
// Supabase 관련 import 해 줘야됨.

const Splash = ({ userId }) => {
  const [page, setPage] = useState(0);
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");
  const [preferences, setPreferences] = useState([]);
  // 수파베이스 preferences 배열로 들어가게끔.. 텍스트말고..텍스트로 들어가도 되나?..확인 필요

  const nextPage = () => {
    if (page < 3) return setPage(page + 1);
    else updateUserInfo(); // 마지막 페이지에서 Supabase 업데이트
  };

  const onPreferenceSelectHandler = (preference) => {
    setPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference]
    );
  };

  //   // Supabase users 테이블 업데이트
  //   const updateUserInfo = async () => {
  //     const { error } = await supabase
  //       .from("users")
  //       .update({
  //         gender,
  //         mbti,
  //         preference: preferences
  //       })
  //       .eq("id", userId);

  //     if (error) console.error("유저 정보 업데이트 실패:", error);
  //     else console.log("유저 정보 업데이트 완료!");
  //   };

  return (
    <ContentBox>
      {page === 0 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>더 정확한 추천을 위해,</p>
          <p>강푸른 님의 성별, MBTI, 선호하는 카페 유형을 알아보겠습니다!</p>
          <Button onClick={nextPage} text="시작하기" />
        </div>
      )}

      {page === 1 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>강푸른 님의 성별은 무엇인가요?</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setGender("남성");
                nextPage();
              }}
              text="남성"
            />
            <Button
              onClick={() => {
                setGender("여성");
                nextPage();
              }}
              text="여성"
            />
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>강푸른 님의 MBTI는 무엇인가요?</p>
          <Input
            type="text"
            placeholder="MBTI 입력"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
            className="text-center border border-gray-300"
          />
          <Button onClick={nextPage} text="다음" />
        </div>
      )}

      {page === 3 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>강푸른 님이 선호하는 카페를 골라주세요.</p>
          <div className="flex flex-col space-y-2">
            {cafeTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.includes(type)}
                  onChange={() => onPreferenceSelectHandler(type)}
                  className="w-5 h-5 accent-blue-900"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
          <Button onClick={nextPage} text="마무리하기" />
        </div>
      )}
    </ContentBox>
  );
};

export default Splash;
