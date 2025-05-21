import bookingModel from "../../../DB/models/booking.model.js";
import reviewModel from "../../../DB/models/reviews.mode.js";

export const createReview = async (req, res) => {
    const { tripId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.id;
    const booking = await bookingModel.findOne({ user: userId, trip: tripId ,tripStatus: 'completed' });
    if (!booking) {
        return res.status(400).json({ message: 'You must book this trip to review it' });
    }
    const review=await reviewModel.create({
        createdBy: userId,
        trip: tripId,
        rating,
        comment
    })
    if (!review) {
        return res.status(400).json({ message: 'Failed to create review' });
    }
    return res.status(201).json({ message: 'Review created successfully', review });
}

export const getReviews = async (req, res) => {
    const { tripId } = req.params;
    const reviews = await reviewModel.find({ trip: tripId }).populate('createdBy', 'name email');
    if (!reviews) {
        return res.status(400).json({ message: 'No reviews found' });
    }
    return res.status(200).json({ message: 'Reviews retrieved successfully', reviews });
}