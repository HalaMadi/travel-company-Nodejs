import mongoose, { model, Schema, Types } from "mongoose";

const couponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    expiredDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'not_active']
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    usedBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
})
const couponModel = mongoose.models.Coupon || model('Coupon', couponSchema);
export default couponModel