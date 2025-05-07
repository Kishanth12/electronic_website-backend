
import brandModel from './../models/brandModel.js';
const addBrand = async (req,res)=>{
    try {
        const {name}= req.body;
        if(!name){
           return  res.status(400).json({message:'Brand name required'})
        }
        const existBand = await brandModel.findOne({name});
        if(existBand){
            return res.status(409).json({message:"Brand is already available"})
        }
        const brand = new brandModel({name})
        await brand.save()
        res.status(201).json({message:"Brand added successfully",brand})
    } catch (error) {
        console.log('error in adding brand',error)
        res.status(500).json({message:error.message})
    }
}

const listBrand = async (req,res)=>{
    try {
        const brands = await brandModel.find({});
        res.status(201).json({success:true,brands})
    } catch (error) {
        console.log(error,"error in list brands");
        res.status(500).json({success:false,message:"error in list brands"})
    }
}

const removeBrand = async (req,res)=>{
    try {
        await brandModel.findByIdAndDelete(req.body.id)
        res.status(201).json({success:true,message:"brand deleted success"})
    } catch (error) {
        console.log(error,"error in delete brand")
        res.status(500),json({success:false,message:"error in delete brand"})
    }
}

export {addBrand,removeBrand,listBrand}