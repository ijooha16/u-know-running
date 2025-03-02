import { Link } from "react-router-dom";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  return (
    <div className="h-[160px] bg-white w-full flex justify-between items-center px-[40px]">
      <div className="w-[220px]"></div>
      <Link to="/" className="text-[#191970] text-[42px] font-bold">
        Logo
      </Link>
      <div className="w-[220px] flex gap-[40px]">
        <Link to={userData ? "/my-page" : "/sign-up"} className="text-darkgray">
          {userData ? "마이페이지" : "회원가입"}
        </Link>
        {userData ? (
          <div className="text-darkgray">로그아웃</div>
        ) : (
          <Link to="/log-in" className="text-darkgray">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
