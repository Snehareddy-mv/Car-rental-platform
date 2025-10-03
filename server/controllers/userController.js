import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

//function to genearte jwt token..so we can use it anywhere
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

//Register User

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Fill All The Fiels" });
    }

    //if a user with email already exists??
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User with same email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//loginUser

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

//Get user data using jwt

export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


//to get list of cars for frontend

export const getCars=async(req,res)=>{
  try {
    const cars=await Car.find({isAvaliable:true})

    return res.json({success:true,cars})
    
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
    
  }

}
