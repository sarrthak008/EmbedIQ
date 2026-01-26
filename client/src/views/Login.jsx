import robot from "../assets/robot.png";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { BRAND_NAME } from "../../config/default";
import Navbar from "../components/Navbar";
import AppGoogleButton from "../components/AppGoogleButton";
import { Link } from "react-router-dom";

const Login = () => {
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
                label="Email"
                type="email"
                placeholder="you@example.com"
              />

              <AppInput
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <div className="flex justify-end">
                <span className="text-sm text-gray-500 hover:text-black cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <AppButton text="Login" />
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
