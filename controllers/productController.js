
//add product
const addProduct = async (req,res)=>{
  try {
    const {name,description,price,category,size,bestseller,brand,features}=req.body;
  } catch (error) {
    
  }
}

//list product
const listProducts = async (req,res)=>{

}

//removeProduct
const removeProduct = async(req,res)=>{

}

//product info
const productInfo = async(req,res)=>{

}

export {addProduct,removeProduct,productInfo,listProducts};