const AppButton = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        w-full
        bg-black
        text-white
        py-3
        rounded-xl
        font-medium
        hover:opacity-90
        transition
      "
    >
      {text}
    </button>
  );
};

export default AppButton;
