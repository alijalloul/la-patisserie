const CustomeInput = ({
  htmlFor,
  text,
  isPassword,
  id,
  placeholder,
  onChange,
  value,
  error,
  className,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-gray-700 ${
          error && ` text-red-500`
        }`}
      >
        {text}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        placeholder={placeholder}
        required
        onChange={onChange}
        value={value}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all ${
          error && `border-red-500 focus:ring-none text-red-500`
        }`}
      />
      {error && <p className=" text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default CustomeInput;
