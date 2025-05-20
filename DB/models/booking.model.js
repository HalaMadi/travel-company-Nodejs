import mongoose, { Types } from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:
    {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripId: {
        type: Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    bookedAt: { type: Date, default: Date.now },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: 'User'
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    phoneNumber: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    }
}, {
    timestamps: true
});

const bookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default bookingModel;