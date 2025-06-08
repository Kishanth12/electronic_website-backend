import validator from 'validator'
import userModel from './../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import productModel from '../models/productModel.js';



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
     try {
          console.log("Received body:", req.body);
          const {email,password}=req.body;
          if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
               const token = jwt.sign(email+password,process.env.JWT_SECRET)
               res.status(201).json({success:true,token})
          } else{
               res.json({success:false,message:"Invalid username password"})
          } 
     } catch (error) {
          console.log(error)
          res.status(500).json({success:false,message:error.message})
 
     }
}

//user add reviews
const addReview = async (req, res) => {
    try {
        const { productId,userId, comment, rating } = req.body;

        if (!productId || !userId || !comment || !rating) {
            return res.status(400).json({ message: 'Fields are are required.' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        product.reviews.push({
          user:userId, 
          comment, 
          rating
    });
        await product.save();

        res.status(201).json({success: true, message: "Review added successfully", reviews: product.reviews});

    } catch (error) {
        console.log('Error in adding review:', error);
        res.status(500).json({ message: error.message });
    }
};


export {loginUser,registerUser,adminLogin,addReview}