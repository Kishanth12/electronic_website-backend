import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String ,required :true},
    description:{type: String ,required :true},
    price:{type: Number ,required :true},
    image:[{type: String ,required :true}],
    sizes:[{type: String ,required :true}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
    bestSeller:{type: Boolean},
    features:[{type: String ,required :true}],
    reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    date: { type: Date, default: Date.now } }],
    date:{type: Date ,default:Date.now},
});

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel;