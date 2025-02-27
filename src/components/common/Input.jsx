const Input = ({ type, onClick, onChange, placeholder, className, disabled }) => {
  return (
    <input
      type={type}
      onClick={onClick}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-[220px] h-[50px] px-[20px] rounded-full ${className}`}
      disabled={disabled}
    />
  );
};

export default Input;
