import mongoose, { model, Schema, Types } from "mongoose";

const tripSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 3,
        max: 50
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    slug: {
        type: String,
        required: true,
    },
    mainImage: {
        type: Object,
        required: true
    },
    subImages: [{
        type: Object,
    }],
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category'
    },
}, {
    timestamps: true
});

const tripModel = mongoose.models.Trip || model('Trip', tripSchema)
export default tripModel