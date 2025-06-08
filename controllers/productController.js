import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';
//add product
const addProduct = async (req,res)=>{
  try {
    const {name,description,price,category,sizes,bestseller,brand,features}=req.body;
    const image1 =req.files.image1 && req.files.image1[0]
    const image2 =req.files.image2 && req.files.image2[0]
    const image3 =req.files.image3 && req.files.image3[0]
    const image4 =req.files.image4 && req.files.image4[0]

    const images =[image1,image2,image3,image4].filter((item)=> item !== undefined)
    let imagesUrl = await Promise.all(
      images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path,{resource_type :'image'});
        return result.secure_url
      })
    )
    const productData = {
      name,
      description,
      price:Number(price),
      image:imagesUrl,
      sizes:sizes ? JSON.parse(sizes) : [],
      category: new mongoose.Types.ObjectId(category),
      brand: new mongoose.Types.ObjectId(brand), 
      bestseller:bestseller ==="true"?true :false,
      features:features ? JSON.parse(features) : [],
      date:Date.now()
    }
    const product =new productModel(productData);
    const savedProduct=await product.save()
    res.json({success:true,message:'product added success',product:savedProduct})

  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error.message})
  }
}

//list product
const listProducts = async (req,res)=>{
   try {
    const products = await productModel.find({}).populate('category', 'name').populate('brand','name');
      res.json({success:true,products})
    
   } catch (error) {
     res.json({success:false,message:error.message})
   }
}

//removeProduct
const removeProduct = async(req,res)=>{
   try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:'product removed'})

   } catch (error) {
    res.json({success:false,message:error.message})

   }
}

//product info
const productInfo = async(req,res)=>{
  try {
    const {productId} =req.body;
    const product = await productModel.findById(req.body.id)
    .populate('category', 'name')  //  Populate category name
    .populate('brand', 'name'); 

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({success:true,message:"product got success",product})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})

  }
}



export {addProduct,removeProduct,productInfo,listProducts};