const Input = ({ type, onClick, onChange, placeholder,value, className, disabled }) => {
  return (
    <input
      type={type}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={`w-[220px] h-[50px] px-[20px] rounded-full ${className}`}
      disabled={disabled}
    />
  );
};

export default Input;
