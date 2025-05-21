import mongoose, { model, Schema, Types } from "mongoose";


const reviewSchema = new Schema({
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    trip: {
        type: Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const reviewModel = mongoose.models.Review || model('Review', reviewSchema)
export default reviewModel