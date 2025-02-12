import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate= useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const { signIn } = useAuth();

  useEffect(() => {
    loadCaptchaEnginge(3);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.email}!`,
      });
      navigate(from, { replace: true } || '/');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };
 
  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    setDisabled(!validateCaptcha(userCaptchaValue));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>
          <div className="relative">
            <label className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10"
              required
            />
            <span
              className="absolute top-10 right-3 cursor-pointer text-gray-500 hover:text-indigo-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <LoadCanvasTemplate />
            <input
              type="text"
              name="captcha"
              placeholder="Type the captcha above"
              onBlur={handleValidateCaptcha}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className={`w-full py-2 text-white font-semibold rounded-md transition-all ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          New here? {" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Create an account
          </Link>
        </p>
        <div className="divider my-6 text-gray-500">OR</div>
      <SocialLogin/>
      </div>
    </div>
  );
};

export default Login;