import React, { useState, useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';

function Customize2() {
  const { userData, setuserData, backendImage, selectedImage, serverUrl } = useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(`${serverUrl}/api/user/post`, formData, {
        withCredentials: true,
      });

      setuserData(result.data); // updates the context
      navigate("/");
    } catch (error) {
      console.log("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>
      <IoArrowBack
        className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]'
        onClick={() => navigate("/customize")}
      />

      <h1 className='text-white text-[30px] mb-[30px] text-center'>
        Enter Your <span className='text-blue-200'>Assistant Name</span>
      </h1>

      <input
        type="text"
        placeholder="e.g. Alexa"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
      />

      {assistantName && (
        <button
          className='min-w-[300px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]'
          disabled={loading}
          onClick={handleUpdateAssistant}
        >
          {loading ? "Loading..." : "Finally Create Your Assistant"}
        </button>
      )}
    </div>
  );
}

export default Customize2;
