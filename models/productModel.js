import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String ,required :true},
    description:{type: String ,required :true},
    price:{type: Number ,required :true},
    image:[{type: String ,required :true}],
    category:{type: String ,required :true},
    sizes:[{type: String ,required :true}],
    BestSeller:{type: Boolean},
    brand:{type: String ,default :false},
    features:[{type: String ,required :true}],
    date:{type: Date ,default:Date.now},
});

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel;