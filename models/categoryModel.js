import mongoose  from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type: Date ,default:Date.now},
}) ;

const categoryModel = mongoose.models.category || mongoose.model("category",categorySchema);

export default categoryModel;
