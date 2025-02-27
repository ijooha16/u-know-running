import Icon from "../common/Icon";

const Header = () => {
  return (
    <div className="h-[160px] bg-white w-full flex justify-between items-center px-[40px]">
      <div className="w-[220px]">
        <Icon icon="hamburger" />
      </div>
      <div className="text-[#191970] text-[42px] font-bold">Logo</div>
      <div className="w-[220px] flex gap-[40px]">
        <div className="text-darkgray">마이페이지</div>
        <div className="text-darkgray">로그인 / 회원가입</div>
      </div>
    </div>
  );
};

export default Header;
