import robot from "../assets/robot.png";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { BRAND_NAME } from "../../config/default";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import AuthService from "../Services/AuthService";


const Signup = () => {

  const [email, SetEmail] = useState();
  const [password, setPassword] = useState();
  const [comapny, setComapny] = useState();
  const [signupTxt, setSignupTxt] = useState("Create Account");
  const navigate = useNavigate();

   const handelSignUp = async()=>{
    let id = toast.loading("Creating Account...")
    const result = await AuthService.signup(comapny,email, password);
    console.log(result)
    if(!result?.success){
       toast.error(result.message,{id:id})
    }else{
      toast.success(result?.data?.message,{id:id})
      navigate("/login")
    }
   }
 

  return (
    <>
      <Navbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gray-50">

        {/* Left – Signup Form (NO BOX) */}
        <div className="flex items-center justify-center px-6 mt-12">
          <div className="w-full max-w-sm">

            <h2 className="text-4xl neo font-bold text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2">
              Start building your AI chatbot today
            </p>

            <div className="mt-8 space-y-5">

              <AppInput
                value={comapny}
                onChange={(txt) => setComapny(txt)}
                label="Company Name"
                type="text"
                placeholder="Your company name"
              />

              <AppInput
                value={email}
                onChange={(txt) => SetEmail(txt)}
                label="Email"
                type="email"
                placeholder="you@company.com"
              />

              <AppInput
                value={password}
                onChange={(txt) => setPassword(txt)}
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <AppButton text={signupTxt} onClick={()=>handelSignUp()}/>
            </div>

            <p className="text-sm text-gray-500 text-center mt-8">
              Already have an account?{" "}
              <Link to={"/login"} className="text-black cursor-pointer font-medium">
                Login
              </Link>
            </p>

          </div>
        </div>

        {/* Right – Robot Side */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 overflow-hidden">
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
              Simple setup. Powerful AI.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;
