const Input = ({ type, onChange, placeholder, className, value }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={`w-[220px] h-[50px] px-[20px] rounded-full ${className}`}
    />
  );
};

export default Input;
