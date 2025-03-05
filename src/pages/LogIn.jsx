import { useState } from "react";
import Button from "../components/common/Button";
import ContentBox from "../components/common/ContentBox";
import Input from "../components/common/Input";
import supabase from "../services/supabase";
import { toast } from "react-toastify";
import useUserStore from "../stores/useUserStore";
import { ErrorMessage, SuccessMessage } from "../data/toastMessages";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserData } = useUserStore();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return toast.error(ErrorMessage.failLogin, error);
    }

    setUserData(data.user);
    //리로드 해야지 조건부 렌더링이 돼서 깜빡이더라도.... 새로고침 이벤트
    setTimeout(() => {
      window.location.replace("/");
    }, 800);
    toast.success(SuccessMessage.successLogin);
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
