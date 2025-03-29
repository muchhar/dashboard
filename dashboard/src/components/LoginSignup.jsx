import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (isLogin) {
      try {
        setLoading(true);
        const response = await axios.post(
          'https://mt4api.frequencee.io/cgi-bin/MT4APIToken.py',
          {
            username: formData.username,
            password: formData.password
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );console.log(response.data);
        if (response.data.token) {
          // Store credentials and token in localStorage
          localStorage.setItem('mt4_username', formData.username);
          localStorage.setItem('mt4_password', formData.password);
          localStorage.setItem('mt4_token', response.data.token);
          navigate('/');
          // You might want to redirect or do something after successful login
        //  alert('Login successful!');
        } else {
          setError('No token received');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    } else {
      // Handle signup logic here if needed
      alert('Signup functionality not implemented yet');
    }
  };

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

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-500/20 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-inter text-[#ddffdc]/60 text-left"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
              required
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
              required
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
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
                required={!isLogin}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#80ee64] text-black font-inter font-semibold rounded-lg hover:bg-[#6ed653] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Processing...'
            ) : isLogin ? (
              'Login'
            ) : (
              'Signup'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#637260]"></div>
          <span className="mx-4 text-sm font-inter text-[#ddffdc]/60">OR</span>
          <div className="flex-1 h-px bg-[#637260]"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 gap-2">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors">
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


// import React, { useState } from "react";

// export default function LoginSignup() {
//   const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-[#151818] border border-[#637260] rounded-2xl p-8">
//         {/* Tabs for Login/Signup */}
//         <div className="flex justify-center gap-4 mb-8">
//           <button
//             onClick={() => setIsLogin(true)}
//             className={`text-lg font-inter font-semibold ${
//               isLogin ? "text-[#80ee64]" : "text-[#ddffdc]/60"
//             }`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setIsLogin(false)}
//             className={`text-lg font-inter font-semibold ${
//               !isLogin ? "text-[#80ee64]" : "text-[#ddffdc]/60"
//             }`}
//           >
//             Signup
//           </button>
//         </div>

//         {/* Form */}
//         <form className="space-y-6">
//           {/* Email Input */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-inter text-[#ddffdc]/60 text-left"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-inter text-[#ddffdc]/60 text-left"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
//             />
//           </div>

//           {/* Confirm Password (Only for Signup) */}
//           {!isLogin && (
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-inter text-[#ddffdc]/60 text-left"
//               >
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-2 mt-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] focus:outline-none focus:border-[#80ee64]"
//               />
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-[#80ee64] text-black font-inter font-semibold rounded-lg hover:bg-[#6ed653] transition-colors"
//           >
//             {isLogin ? "Login" : "Signup"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-6">
//           <div className="flex-1 h-px bg-[#637260]"></div>
//           <span className="mx-4 text-sm font-inter text-[#ddffdc]/60">OR</span>
//           <div className="flex-1 h-px bg-[#637260]"></div>
//         </div>

//         {/* Social Login Buttons */}
//         <div className="space-y-4">
//           <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
//               alt="Google"
//               className="w-5 h-5"
//             />
//             Continue with Google
//           </button>
//           <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#151818] border border-[#637260] rounded-lg text-[#ddffdc] hover:border-[#80ee64] transition-colors pt-1">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
//               alt="FaceBook"
//               className="w-5 h-5"
//             />
//             Continue with Facebook
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }