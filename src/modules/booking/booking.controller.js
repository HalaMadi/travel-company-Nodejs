import bookingModel from "../../../DB/models/booking.model.js";
import tripModel from "../../../DB/models/trip.model.js";

export const createBooking = async (req, res) => {
    try {
        const { tripId, numberOfPeople } = req.body;
        const userId = req.id;
        const trip = await tripModel.findById(tripId);
        if (!trip || !trip.isAvailable) {
            return res.status(400).json({ message: 'Trip not available' });
        }
        const currentBookings = await bookingModel.aggregate([
            { $match: { tripId: trip._id } },
            { $group: { _id: null, total: { $sum: "$numberOfPeople" } } }
        ]);
        const totalBooked = currentBookings[0]?.total || 0;
        const remainingCapacity = trip.maxCapacity - totalBooked;
        if (numberOfPeople > remainingCapacity) {
            return res.status(400).json({ message: `Only ${remainingCapacity} seats left. Cannot book ${numberOfPeople} people.` });
        }
        const booking = await bookingModel.create({ userId, tripId, numberOfPeople });
        return res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        return res.status(200).json({ message: 'All bookings retrieved successfully', bookings });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingModel.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).json({ message: 'Booking retrieved successfully', booking });
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
        const bookings = await bookingModel.find({ userId });
        return res.status(200).json({ message: 'User bookings retrieved successfully', bookings });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
