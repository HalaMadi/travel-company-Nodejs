import mongoose, { model, Schema, Types } from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps:true
})
const categoryModel=mongoose.models.Category|| model('Category',categorySchema)
export default categoryModel