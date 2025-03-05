import hamburgerIcon from "../../assets/icons/icon_hamburger.png";
import profileIcon from "../../assets/icons/icon_profile.png";
import bookMarkIcon from "../../assets/icons/icon_bookmark.png";
import closeIcon from "../../assets/icons/icon_close.png";
import hamburgerIconWhite from "../../assets/icons/icon_hamburger_white.png";
import sendIcon from "../../assets/icons/icon_send.png";
import deleteIcon from "../../assets/icons/icon_delete.png";
import editIcon from "../../assets/icons/icon_edit.png";
import checkIcon from "../../assets/icons/icon_check.png";
import bookMarkEmptyIcon from "../../assets/icons/icon_bookMark_empty.png";

//아이콘 import 해주기
//iconSrc 객체 안에 키-값(아이콘변수명) 넣어주기
//쓸 컴포넌트로 가서 iconSrc='키'

const Icon = ({ icon, small, onClick, className }) => {
  const iconSrc = {
    bookMark: bookMarkIcon,
    hamburger: hamburgerIcon,
    profile: profileIcon,
    close: closeIcon,
    hamburger_white: hamburgerIconWhite,
    send: sendIcon,
    delete: deleteIcon,
    edit: editIcon,
    check: checkIcon,
    bookMark_empty: bookMarkEmptyIcon
  };

  return (
    <img
      src={iconSrc[icon]}
      alt={`${icon} icon`}
      className={`${className} ${small ? "w-[24px] h-[24px]" : "w-[32px] h-[32px]"} cursor-pointer`}
      onClick={onClick}
    />
  );
};

export default Icon;
