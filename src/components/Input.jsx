const Input = ({ type, value, inputMode, placeholder, onChange }) => {
  return (
    <input
      type={type}
      inputMode={inputMode && inputMode}
      value={value}
      className="input input-sm h-10 md:input-md bg-transparent rounded-md input-info  input-bordered transition-all duration-300 ease-in-out "
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default Input;
