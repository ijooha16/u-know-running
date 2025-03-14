import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../../services/supabase";
import useUserStore from "../../stores/useUserStore";
import { ErrorMessage } from "../../data/toastMessages";
import Logo from '../../assets/images/해시카페.png'

const Header = () => {
  const { userData } = useUserStore();

  const onLogoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return toast.error(ErrorMessage.failLogout + error);
    }

    window.localStorage.removeItem("user-data");
    window.location.replace("/");
  };

  return (
    <div className="h-[160px] bg-white w-full flex justify-between items-center px-[40px]">
      <div className="w-[220px]"></div>
      <Link to="/">
        <img src={Logo} className="w-[100px] cursor-pointer" />
      </Link>
      <div className="w-[220px] flex gap-[40px]">
        <Link to={userData ? "/my-page" : "/sign-up"} className="text-darkgray cursor-pointer">
          {userData ? "마이페이지" : "회원가입"}
        </Link>
        {userData ? (
          <button className="text-darkgray cursor-pointer" onClick={onLogoutHandler}>
            로그아웃
          </button>
        ) : (
          <Link to="/log-in" className="text-darkgray cursor-pointer">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
