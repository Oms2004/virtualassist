import React from 'react'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
function Card({image}) {
    const{ serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(UserDataContext)
  return (
    <div className={`w-[70px] h-[140px] bg-[#030326ec] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{setSelectedImage(image)
   setBackendImage(null)
   setFrontendImage(null)

    }}>
    <img src={image} className='h-full object-cover' />

    </div>
  )
}

export default Card  
