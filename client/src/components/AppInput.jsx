const AppInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600 font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="
          px-4 py-3
          rounded-xl
          border border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-black/20
          transition
        "
      />
    </div>
  );
};

export default AppInput;
