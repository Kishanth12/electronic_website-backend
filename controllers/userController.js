import validator from 'validator'
import userModel from './../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createToken = (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET) 
}
// route for user login
const loginUser = async (req,res)=>{
    try {
     const {email,password}=req.body;

     const user = await userModel.findOne({email})
     if(!user){
          return res.status(500).json({success:false,message:"User doesn't exists"})
     }
     const isMatch = await bcrypt.compare(password,user.password);
     if(isMatch){
          const token = createToken(user._id)
          return res.status(200).json({success:true,message:'login success',token})
     }
     else{
          return res.status(500).json({success:false,message:"User Login Failed"})
     }
    } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,message:error.message})

    }
}

//route for user register
const registerUser =async (req,res)=>{
     try {
       const {name,email,password}= req.body;
        //checking user already exists
        const exists = await userModel.findOne({email})

        if(exists){
          return res.status(500).json({success:false,message:"User already exists"})
        }
        //validate email format and strongPassword
        if(!validator.isEmail(email)){
          return res.status(500).json({success:false,message:"Please enter a valid Email"})
        }
        if(password.length < 8){
          return res.json({success:false,message:"Please enter a Strong Password"})
        }
     // hashing user password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)
     const newUser = new userModel({
          name,
          email,
          password:hashedPassword
     })
     const user = await newUser.save();

     const token = createToken(user._id)
     res.json({success:true ,token})

     }catch (error) {
          console.log(error)
          res.status(500).json({success:false,message:error.message})
     }
}

//route for admin login
const adminLogin = async (req,res)=>{

}

export {loginUser,registerUser,adminLogin}