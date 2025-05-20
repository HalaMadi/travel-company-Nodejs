import bookingModel from "../../../DB/models/booking.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import tripModel from "../../../DB/models/trip.model.js";
export const createBooking = async (req, res) => {
    try {
        const { tripId, numberOfPeople, couponName, paymentType, phoneNumber } = req.body;
        const userId = req.id;
        const trip = await tripModel.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        let discount = 0;
        if (couponName) {
            const coupon = await couponModel.findOne({ name: couponName });
            if (!coupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }
            if (coupon.expiryDate < new Date()) {
                return res.status(400).json({ message: 'Coupon expired' });
            }
            if (coupon.usedBy.includes(userId)) {
                return res.status(400).json({ message: 'Coupon already used' });
            }
            if (coupon.status === 'not_active') {
                return res.status(400).json({ message: 'Coupon not active' });
            }
            const originalPrice = trip.price * numberOfPeople;
            if (coupon.discountPercentage) {
                discount = (originalPrice * coupon.discountPercentage) / 100;
            } else if (coupon.discountAmount) {
                discount = coupon.discountAmount;
            }
        }
        const existingBooking = await bookingModel.findOne({ userId, tripId });
        if (existingBooking) {
            return res.status(400).json({ message: 'Booking already exists for this trip' });
        }
        const totalSeats = await bookingModel.aggregate([
            { $match: { tripId } },
            { $group: { _id: null, total: { $sum: "$numberOfPeople" } } }
        ]);
        const totalSeatsBooked = totalSeats[0]?.total || 0;
        const availableSeats = trip.maxCapacity - totalSeatsBooked;
        if (numberOfPeople > availableSeats) {
            return res.status(400).json({ message: 'No seats available' });
        }
        const originalPrice = trip.price * numberOfPeople;
        const totalPrice = originalPrice - discount;
        const booking = await bookingModel.create({
            userId,
            tripId,
            numberOfPeople,
            paymentType: paymentType || 'cash',
            phoneNumber,
            totalPrice,
            createdBy: userId,
            updatedBy: userId
        });
        if (couponName) {
            await couponModel.updateOne(
                { name: couponName },
                { $addToSet: { usedBy: userId } }
            );
        }
        return res.status(201).json({ message: 'Booking created successfully', booking });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }
        return res.status(200).json({ message: 'All bookings retrieved successfully', bookings });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ['pending', 'confirmed', 'canceled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        const booking = await bookingModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { tripId, numberOfPeople } = req.body;
    const trip = await tripModel.findById(tripId);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const totalSeats = await bookingModel.aggregate([
        { $match: { tripId } },
        { $group: { _id: null, total: { $sum: "$numberOfPeople" } } }
    ]);
    const totalSeatsBooked = totalSeats[0]?.total || 0;
    const availableSeats = trip.maxCapacity - totalSeatsBooked;
    if (numberOfPeople > availableSeats) {
        return res.status(400).json({ message: 'No seats available' });
    }
    const booking = await bookingModel.findByIdAndUpdate(id, { tripId, numberOfPeople }, { new: true }).populate('updatedBy');
    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

}
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingModel.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.id;
        const bookings = await bookingModel.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ message: 'User bookings retrieved successfully', bookings });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
