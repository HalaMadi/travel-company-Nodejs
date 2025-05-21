import bookingModel from "../../../DB/models/booking.model.js";
import reviewModel from "../../../DB/models/reviews.mode.js";
import tripModel from "../../../DB/models/trip.model.js";

export const createReview = async (req, res) => {
    const { tripId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.id;
    const trip = await tripModel.findById(tripId);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const booking = await bookingModel.findOne({ userId, tripId });
    if (!booking) {
        return res.status(400).json({ message: 'You must book this trip to review it' });
    }
    if (trip.tripStatus !== 'completed') {
        return res.status(400).json({ message: 'You can only review completed trips' });
    }
    const review = await reviewModel.create({
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