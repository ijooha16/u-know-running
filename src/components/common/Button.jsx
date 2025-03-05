import Icon from "./Icon";

const Button = ({ icon, type, onClick, text, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary flex items-center gap-4 font-semibold text-white h-[50px] px-[30px] rounded-full z-50 ${className}`}
    >
      {icon && <Icon icon={icon} />} 
      {text}
    </button>
  );
};

export default Button;

//코랄 ff6161
//핑크
//네이비 191970
//블루 4682B4
//크림 베이지 F5DEB3 FFF8DC
