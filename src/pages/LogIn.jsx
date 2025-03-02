import { useState } from "react";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
import Input from "../components/common/Input";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return toast.error('로그인 오류: ' + error)
    }

    setUserData(data.user)
    toast.success("로그인 성공");
    //리로드 해야지 조건부 렌더링이 돼서 깜빡이더라도.... 새로고침 이벤트
    window.location.replace("/")
  };

  return (
    <form onSubmit={onLoginHandler}>
      <ContentBox>
        <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button text="로그인" />
      </ContentBox>
    </form>
  );
};

export default LogIn;
