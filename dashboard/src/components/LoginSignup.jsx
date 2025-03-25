import React, { useState } from "react";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#151818] border border-[#637260] rounded-2xl p-8">
        {/* Tabs for Login/Signup */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`text-lg font-inter font-semibold ${
              isLogin ? "text-[#80ee64]" : "text-[#ddffdc]/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-inter font-semibold ${
              !isLogin ? "text-[#80ee64]" : "text-[#ddffdc]/60"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-inter text-[#ddffdc]/60 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-inter text-[#ddffdc]/60 text-left"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
            />
          </div>

          {/* Confirm Password (Only for Signup) */}
          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-inter text-[#ddffdc]/60 text-left"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#80ee64] text-black font-inter font-semibold rounded-lg hover:bg-[#6ed653] transition-colors"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#637260]"></div>
          <span className="mx-4 text-sm font-inter text-[#ddffdc]/60">OR</span>
          <div className="flex-1 h-px bg-[#637260]"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors pt-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="FaceBook"
              className="w-5 h-5"
            />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}