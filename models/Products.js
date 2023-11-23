import { model, Schema, models } from "mongoose";
import { mongoose } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    price: { type: Number, required: true},
    images: [{type: [String]}],
    category: {type: [String], required:true},
    subCategory: {type: [String], required:true},
    languages: {type: [String]},
    discount: {type: Number},
    count: {type: Number},
})

export const Product = models.Product || model('Product', ProductSchema);