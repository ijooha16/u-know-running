const Input = ({ type, onClick, placeholder, className, disabled }) => {
  return (
    <input
      type={type}
      onClick={onClick}
      placeholder={placeholder}
      className={`w-[220px] h-[50px] px-[20px] rounded-full ${className}`}
      disabled={disabled}
    />
  );
};

export default Input;
