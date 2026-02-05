const AppGoogleButton = ({ text = "Continue with Google" }) => {

  const handleGoogleLogin = () => {
    // redirect to Spring Boot OAuth
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="
        w-full
        flex items-center justify-center gap-3
        border border-gray-300
        py-3 rounded-xl
        text-gray-700 font-medium
        hover:bg-gray-50
        transition
      "
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {text}
    </button>
  );
};

export default AppGoogleButton;
