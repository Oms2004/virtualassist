import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "https://virtualassist-backend.onrender.com"; 
  const [userData, setuserData] = useState(null);
  
     const [frontendImage,setFrontendImage]=useState(null)
     const [backendImage,setBackendImage]=useState(null)
    const  [selectedImage,setSelectedImage]=useState(null)



  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setuserData(result.data);
      console.log("Current user:", result.data);
    } catch (error) {
      console.log("Error fetching current user:", error.message);
    }
  };
 const getGeminiResponse=async (command)=>{
  
try{

  const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
  return result.data

}catch(error){
     console.log(error)
}
 }


useEffect(() => {
  const fetchUser = async () => {
    const res = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
    setuserData(res.data);
  };
  fetchUser();
}, []);


  return (
    <UserDataContext.Provider value={{ serverUrl, userData, setuserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage,getGeminiResponse}}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
