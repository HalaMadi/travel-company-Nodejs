import userModel from "../../../DB/models/user.model.js";

export const  profile = async (req, res) => {
    const userId = req.id;
    const user = await userModel.findById(userId).populate('bookings');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User profile retrieved successfully', user });
}
export const updateProfile = async (req, res) => {
    const userId = req.id;
    const { userName, email, phone } = req.body;
    if (!userName || !email || !phone) {
        return res.status(400).json({ message: 'Name, email and phone are required' });
    }
    const user = await userModel.findByIdAndUpdate(userId, { userName, email, phone }, { new: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User profile updated successfully', user });
}
export const deleteProfile = async (req, res) => {
    const userId = req.id;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User profile deleted successfully' });
}
export const getAllUsers = async (req, res) => {
    const users = await userModel.find();
    if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({ message: 'All users retrieved successfully', users });
}