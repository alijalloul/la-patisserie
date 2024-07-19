interface CustomeInputProps {
  htmlFor: string;
  text: string;
  isPassword: boolean;
  id: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomeInput = ({
  htmlFor,
  text,
  isPassword,
  id,
  placeholder,
  onChange,
}: CustomeInputProps) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {text}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        placeholder={placeholder}
        required
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default CustomeInput;
