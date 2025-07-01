import React, { useContext, useState, useEffect } from 'react';
import bg from '../assets/authBg.png';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setuserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      }, {
        withCredentials: true
      });

      console.log("Sign-in response:", result.data); // ✅ Log to verify structure

      setuserData(result.data); // ✅ Save full user object
      navigate('/');
    } catch (error) {
      console.error("Sign-in error:", error.response?.data || error.message); // ✅ Debug log
      setuserData(null);
      setErr(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000069] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-[30px] font-semibold text-center">
          Sign In to <span className="text-blue-700">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <div className="w-full h-[60px] relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] text-[18px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {err && <p className="text-red-500 text-[17px]">* {err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          Want to create a new account? <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
