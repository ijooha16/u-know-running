import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ContentBox from "../components/common/ContentBox";
import useUserStore from "../stores/useUserStore";
import { toast } from "react-toastify";
import { ErrorMessage, SuccessMessage } from "../data/toastMessages";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { setUserData } = useUserStore();

  const onSignupHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error(ErrorMessage.discrepancyPassword);
    }

    //수파베이스에 있는 회원가입 함수
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });
    if (error) {
      return toast.error(ErrorMessage.failRegister), console.log(error);
    }

    //회원가입시 자동으로 로그인 되면 그 정보를 스토어에 넘기는 로직
    setUserData(data.user);
    setTimeout(() => {
      window.location.replace("/splash");
    }, 800);
    toast.success(SuccessMessage.successRegister);
  };

  return (
    <form onSubmit={onSignupHandler}>
      <ContentBox>
        <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Input placeholder="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <Button text="회원가입" />
      </ContentBox>
    </form>
  );
};

export default SignUp;
