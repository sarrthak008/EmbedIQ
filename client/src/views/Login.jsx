import robot from "../assets/robot.png";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { BRAND_NAME } from "../../config/default";
import Navbar from "../components/Navbar";
import AppGoogleButton from "../components/AppGoogleButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../features/Auth/AuthSlice";
import AuthService from "../Services/AuthService";


const Login = () => {

  const [email, SetEmail] = useState();
  const [password, setPassword] = useState();
  const [LoginTxt, setLoginTxt] = useState("Login")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async () => {
    let id = toast.loading("Login...")
    const result = await AuthService.login(email, password);
    console.log(result)
    if (!result?.success) {
      toast.error(result.message, { id: id })
    } else {
      toast.success(result?.data?.message, { id: id })
      dispatch(setUser(result?.data.data))
      navigate("/dashboard")
    }
  }

  const autoLogtoDashboard = () => {
    try {
      let user = JSON.parse(localStorage.getItem("USER")) || null
      if (user) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    autoLogtoDashboard()
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen mt-12 grid md:grid-cols-2 bg-gray-50">

        {/* Left – Robot Side */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-100 overflow-hidden">
          <img
            src={robot}
            alt="Robot"
            className="w-[420px] opacity-10 absolute"
          />
          <div className="relative z-10 text-center px-10">
            <h1 className="neo text-6xl font-extrabold text-gray-800">
              {BRAND_NAME}
            </h1>
            <p className="text-gray-600 mt-4">
              Welcome back. Let your AI work for you.
            </p>
          </div>
        </div>

        {/* Right – Login Form (NO BOX) */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-sm">

            <h2 className="text-5xl neo font-bold text-gray-900">
              Login
            </h2>
            <p className="text-gray-500 mt-2">
              Access your dashboard
            </p>

            {/* Google Login */}
            <div className="mt-8">
              <AppGoogleButton />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-400">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Email Form */}
            <div className="space-y-5">
              <AppInput
                value={email}
                onChange={(text) => SetEmail(text)}
                label="Email"
                type="email"
                placeholder="you@example.com"
              />

              <AppInput
                value={password}
                onChange={(text) => setPassword(text)}
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <div className="flex justify-end">
                <span className="text-sm text-gray-500 hover:text-black cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <AppButton text={LoginTxt} onClick={() => handelLogin()} />
            </div>

            <p className="text-sm text-gray-500 text-center mt-8">
              Don’t have an account?{" "}
              <Link to={"/signup"} className="text-black cursor-pointer font-medium">
                Sign up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
