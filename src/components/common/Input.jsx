const Input = ({ type, onClick, placeholder, className }) => {
  return (
    <input
      type={type}
      onClick={onClick}
      placeholder={placeholder}
      className={`w-[220px] h-[50px] px-[20px] rounded-full ${className}`}
    />
  );
};

export default Input;
