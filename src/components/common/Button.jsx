const Button = ({ type, onClick, text }) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#191970] font-semibold text-white h-[50px] px-[30px] rounded-full">
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