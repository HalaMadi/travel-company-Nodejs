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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
},{
    timestamps:true
})
const categoryModel=mongoose.models.Category|| model('Category',categorySchema)
export default categoryModel