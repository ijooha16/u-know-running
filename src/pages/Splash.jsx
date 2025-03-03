import React, { useState } from "react";
import { CafeTagTypes } from "../data/CafeTypes";
import ContentBox from "../components/common/ContentBox";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import supabase from "../services/supabase";
import useUserStore from "../stores/useUserStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const { userData } = useUserStore();
  const nickname = userData.user_metadata.nickname;

  const navigator = useNavigate();

  const [page, setPage] = useState(0);
  const [gender, setGender] = useState("");
  const [mbti, setMbti] = useState("");
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState(null); // 성별 선택용 상태

  const updateUserInfo = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        gender,
        mbti,
        tag: tags
      })
      .eq("users_uid", userData.id);

    if (error) console.error("유저 정보 업데이트 실패", error);
    else console.log("유저 정보 업데이트 완료");
  };

  const nextPage = () => {
    if (page === 2) {
      if (!isValidMbti(mbti)) {
        toast.error("유효한 mbti 형식을 입력해 주세요.");
        return;
      }
      setMbti(mbti.toUpperCase());
    }
    if (page < 3) {
      // 페이지 전환 시, 현재 페이지가 1일 때 선택된 성별을 gender 상태로 저장
      if (page === 1 && selected) {
        setGender(selected);
      }
      setPage(page + 1);
    } else {
      updateUserInfo();
      toast.success(`${nickname}님, 환영합니다! Home 으로 이동하여 오늘의 카페를 찾아보세요!`, {
        autoClose: 8000,
        onClose: () => {
          navigator("/");
        }
      });
    }
  };

  const onTagSelectHandler = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // 성별 체크박스에서 하나만 선택하도록 하는 핸들러
  const handleCheckboxChange = (value) => {
    setSelected(selected === value ? null : value);
  };

  // mbti 유효성 검사
  const isValidMbti = (input) => {
    const mbtiRegex = /^[IENSTFPJ]{4}$/i;
    return mbtiRegex.test(input);
  };

  return (
    <ContentBox>
      {page === 0 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>
            더 정확한 추천을 위해,
            <br />
            {nickname} 님의
            <br />
            성별, MBTI, 선호하는 카페 유형을 <br />
            알아보겠습니다!
          </p>
          <Button onClick={nextPage} text="시작하기" />
        </div>
      )}

      {page === 1 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>{nickname} 님의 성별은 무엇인가요?</p>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected === "남성"}
                onChange={() => handleCheckboxChange("남성")}
                className="w-5 h-5 accent-blue-900"
              />
              <span>남성</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected === "여성"}
                onChange={() => handleCheckboxChange("여성")}
                className="w-5 h-5 accent-blue-900"
              />
              <span>여성</span>
            </label>
          </div>
          <Button onClick={nextPage} text="다음" />
        </div>
      )}

      {page === 2 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>{nickname} 님의 MBTI는 무엇인가요?</p>
          <Input
            type="text"
            placeholder="MBTI 입력"
            value={mbti}
            maxLength={4}
            onChange={(e) => {
              setMbti(e.target.value);
            }}
            className="text-center border border-gray-300"
          />
          <Button onClick={nextPage} text="다음" />
        </div>
      )}

      {page === 3 && (
        <div className="text-center flex flex-col items-center gap-4">
          <p>{nickname} 님이 선호하는 카페를 골라주세요.</p>
          <div className="flex flex-col space-y-2">
            {Object.values(CafeTagTypes).map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tags.includes(type)}
                  onChange={() => onTagSelectHandler(type)}
                  className="w-5 h-5 accent-blue-900"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
          <div>
            <Button onClick={nextPage} text="제출하기" />
          </div>
        </div>
      )}
    </ContentBox>
  );
};

export default Splash;
