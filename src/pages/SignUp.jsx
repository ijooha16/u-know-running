import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ContentBox from "../components/common/ContentBox";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onSignupHandler = async (e) => {
    e.preventDefault();

    //수파베이스에 있는 회원가입 함수
    const { data,error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });
    if (error) throw error;

    const { data: users } = await supabase.from("users").insert({email, nickname}).select();

    //회원가입 완료 후 알럿창과 함께 페이지 이동
    alert("회원가입 완료");
    // useNavigate('')
    //ㄴ오류날까봐 일단 주석처리....
  };
  return (
    <form onSubmit={onSignupHandler}>
      <ContentBox>
        <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input placeholder="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <Button text="회원가입" />
      </ContentBox>
    </form>
  );
};

export default SignUp;
