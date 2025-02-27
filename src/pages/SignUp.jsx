import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ContentBox from "../components/common/ContentBox";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onSignupHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname
        }
      }
    });
    if (error) throw error;
    alert("회원가입 완료");
  };
  return (
    <ContentBox>
      <form onSubmit={onSignupHandler}>
        <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input placeholder="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <Button>회원가입</Button>
      </form>
    </ContentBox>
  );
};

export default SignUp;
