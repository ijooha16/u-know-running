import { useState } from "react";
import supabase from "../services/supabase";

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
    <form onSubmit={onSignupHandler}>
      <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <button>회원가입</button>
    </form>
  );
};

export default SignUp;
