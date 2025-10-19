import User from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register controller
export const registerUser = asyncHandler(async (req, res, next) => {
  const { fullname, email, password, gender, phoneNumber } = req.body;
  if (!fullname || !email || !password  || !gender) {
    let missingFields = [];

    if (!fullname) missingFields.push("fullname");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!gender) missingFields.push("gender");
    return next(
      new ErrorHandler(
        `Please fill all fields: ${missingFields.join(", ")} missing`,
        400
      )
    );
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new ErrorHandler("User already exists", 400));
  }


   const avatar = `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${email}`
  // Generate avatar
// const avatar = `https://api.dicebear.com/6.x/${gender === 'male' ? 'male' : 'female'}/svg?seed=${email}`;

   
   //hashing the password here
   const hashedPassword = await bcrypt.hash(password, 10); 
   

  const newUser = await User.create({
    email,
    fullname,
    password:hashedPassword,
    gender,
    avatar,
  });

  const tokenData = {
    _id: newUser?._id
  }

  //token code here
  const expires = process.env.JWT_EXPIRES_IN || "7d"; // default 7d
const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: expires });
  
   // Hide password before sending
  newUser.password = undefined;

  res.status(200)
  .cookie("token",token, {
    expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES || 7) * 24*60*60*1000),
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
  .json({
    success:true,
    user: newUser,
    token,
    message:"User register successfully."
  })
});


//login user controller
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  // Check if user exists
  const existUser = await User.findOne({ email });
  if (!existUser) {
    return next(new ErrorHandler("User does not exist", 400));
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, existUser.password);
  if (!isValidPassword) {
    return next(new ErrorHandler("Please enter a valid password", 400));
  }

  // Remove password before sending
  existUser.password = undefined;

   const tokenData = {
    _id: existUser?._id
  }

  //token code here
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN || "7d"
});


  res
  .status(200)
   .cookie("token",token, {
    expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRES || 7) * 24*60*60*1000),
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
  .json({
    success: true,
    user: existUser,
    token,
    message:"Login SuccessFully."
  });
});



//get-profile user controller
export const getProfileUser = asyncHandler(async (req, res, next) => {
    
  const userId = req.user;

  const profile = await User.findById(userId)

  res
  .status(200)
  .json({
    success:true,
    responseData:profile
  })

});


//user logout
export const logOutUser = asyncHandler(async (req, res, next) => {

  res
  .status(200)
    .cookie("token", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
  .json({
    success:true,
    message:"Logout successfuly."
  })

});


//find other user

export const getOtherUserController = asyncHandler(async(req,res,next)=>{
  const otherUser = await User.find({_id: {$ne: req.user}})
   
  res.status(200).json({
    success:true,
    responseData: otherUser,
  })
})
