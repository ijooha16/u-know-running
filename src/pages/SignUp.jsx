import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ContentBox from "../components/common/ContentBox";
import useUserStore from "../stores/useUserStore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { setUserData } = useUserStore;

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

//회원가입시 자동으로 로그인 되면 그 정보를 스토어에 넘기는 로직
    setUserData(data.user)
//리로드 되어야 헤더의 로그인/회원가입이 바뀌어서 리로드 하면서 페이지 이동
    window.location.replace("/splash")
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
