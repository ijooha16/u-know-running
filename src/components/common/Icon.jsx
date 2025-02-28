import hamburgerIcon from "../../assets/icons/icon_hamburger.png";
import profileIcon from "../../assets/icons/icon_profile.png";
import bookMarkIcon from "../../assets/icons/icon_bookmark.png";
import closeIcon from "../../assets/icons/icon_close.png";
import hamburgerIconWhite from "../../assets/icons/icon_hamburger_white.png";

//아이콘 import 해주기
//iconSrc 객체 안에 키-값(아이콘변수명) 넣어주기
//쓸 컴포넌트로 가서 iconSrc='키'

const Icon = ({ icon, className }) => {
  const iconSrc = {
    bookMark: bookMarkIcon,
    hamburger: hamburgerIcon,
    profile: profileIcon,
    close: closeIcon,
    hamburger_white: hamburgerIconWhite,
  };

  return <img src={iconSrc[icon]} alt={`${icon} icon`} className={`w-[32px] h-[32px] ${className}`} />;
};

export default Icon;
