import categoryModel from './../models/categoryModel.js';


//add category 

const addCategory = async (req,res)=>{
    try {
        const{name} = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).json({ message: 'Category already exists' });
        }
        const category =new categoryModel({name})
        await category.save()
        res.status(201).json({success:true, message: 'Category created successfully', category });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const listCategory=async(req,res)=>{
    try {
        const categories =await categoryModel.find({});
        res.status(200).json({success:true,message:"categories listed" ,categories})
    } catch (error) {
        console.log(error,"error in finding categories")
        res.status(500).json({success:false,message:"error in list categories"})

    }
}

const removeCategory=async(req,res)=>{
    try {
        await categoryModel.findByIdAndDelete(req.body.id)
        res.status(201).json({success:true, message:"category deleted"})
    } catch (error) {
        res.status(500).json({success:false,message:"error in delete category"})
    }
}

const editCategory=async(req,res)=>{
    try {
        const {id, ...updateData } = req.body;
        const updated= await categoryModel.findByIdAndUpdate(id,updateData, { new: true })
        if(!updated){
           return res.status(500).json({success:false,message:"update failed"})
        }
        return res.status(200).json({success:true, message:"category updated"})
    } catch (error) {
      res.status(500).json({success:false,message:"error in update category"})
      console.log(error)
    }
}
export  {addCategory,listCategory,removeCategory,editCategory};