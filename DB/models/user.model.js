import mongoose, { model, Schema, Types } from "mongoose";


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    phone: {
        type: String
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'not_active']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
    sendCode: {
        type: String,
        default: null,
    },
    bookings: [{
        type: Types.ObjectId,
        ref: 'Booking'
    }]
}, {
    timestamps: true
})
const userModel = mongoose.models.User || model('User', userSchema)
export default userModel