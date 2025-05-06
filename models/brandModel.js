import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type: Date ,default:Date.now},
});

const brandModel =mongoose.models.brand || mongoose.model("brand",brandSchema)

export default brandModel;