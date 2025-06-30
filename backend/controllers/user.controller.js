import { uploadOnCloudinary } from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error getting current user", error: error.message });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      assistantImage = cloudinaryResponse?.url;
    } else if (imageUrl) {
      assistantImage = imageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(assistantName && { assistantName }),
        ...(assistantImage && { assistantImage }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Update Assistant error", error: error.message });
  }
};

export const askToAssistant=async(req,res)=>{
    try{
        const {command}=req.body
        const user=await User.findById(req.userId);
        user.history.push(command)
        user.save()
        const userName=user.name
        const assistantName=user.assistantName
        const result=await geminiResponse(command,assistantName,userName)
       let gemResult;
try {
  const jsonMatch = result.match(/{[\s\S]*}/);
  if (!jsonMatch) throw new Error("Invalid response from Gemini");
  gemResult = JSON.parse(jsonMatch[0]);

} catch (err) {
  return res.status(500).json({ response: "Sorry, I couldn't parse that." });
}
        const type=gemResult.type
          switch(type){
         case 'get-date' :
            return res.json({
               type,
               userInput:gemResult.userInput,
               response:`current date is ${moment().format("YYYY-MM-DD")}`
            });
            case 'get-time':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`current time is ${moment().format("hh:mm A")}`
            });
             case 'get-day':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`today is ${moment().format("dddd")}`
            });
            case 'get-month':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`today is ${moment().format("MMMM")}`
            });
      case 'google-search':
      case 'youtube-search':
      case 'youtube-play':
      case 'general':
      case  "calculator-open":
      case "instagram-open": 
       case "facebook-open": 
       case "weather-show" :
         return res.json({
            type,
            userInput:gemResult.userInput,
            response:gemResult.response,
         });

         default:
            return res.status(400).json({ response: "I didn't understand that command." })
      }
     
   } catch (error) {
  return res.status(500).json({ response: "ask assistant error" })
   }
}
