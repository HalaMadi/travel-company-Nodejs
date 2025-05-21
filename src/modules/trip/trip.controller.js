import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import tripModel from "../../../DB/models/trip.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const createTrip = async (req, res) => {
        const { title, categoryId, startDate, endDate, location } = req.body;
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const overlap = await tripModel.findOne({
            location,
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        })
        if (overlap) {
            return res.status(400).json({ message: 'Trip dates overlap with an existing trip' });
        }
        const slug = slugify(title);
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.files.mainImage[0].path,
            { folder: `${process.env.APP_NAME}/trips/${slug}` }
        );
        req.body.subImages = [];
        for (let file of req.files.subImages) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(
                file.path,
                { folder: `${process.env.APP_NAME}/trips/${slug}/subImages` }
            );
            req.body.subImages.push({ secure_url, public_id });
        }
        req.body.mainImage = { secure_url, public_id };
        req.body.slug = slug;
        req.body.createdBy = req.id;
        req.body.updatedBy = req.id;
        const trip = await tripModel.create(req.body);
        return res.status(201).json({ message: 'Trip created successfully', trip });

};
export const getAllTrips = async (req, res) => {
    const trips = await tripModel.find().populate('categoryId', 'title');
    return res.status(200).json({ message: 'Trips retrieved successfully', trips });
};
export const getAvailableTrips = async (req, res) => {
    const trips = await tripModel.find({ isAvailable: true });
    return res.status(200).json({ message: 'Available trips retrieved successfully', trips });
}
export const detailsTrip = async (req, res) => {
    const { id } = req.params
    const trip = await tripModel.findById(id).populate('reviews');
    if (!trip) {
        return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json({ message: 'Success', trip })
};

export const deleteTrip = async (req, res) => {
    const { id } = req.params
    const trip = await tripModel.findByIdAndDelete(id);
    if (!trip) {
        return res.status(404).json({ message: 'Not found' })
    }
    await cloudinary.uploader.destroy(trip.mainImage.public_id)
    return res.status(200).json({ message: 'Trip deleted Successfully' })
}

export const updateTrip = async (req, res) => {
    const { id } = req.params
    const { title } = req.body;
    const userId = req.id;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    const trip = await tripModel.findById(id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip Not found' })
    }
    trip.title = title;
    trip.slug = slugify(title);
    trip.updatedBy = userId;
    await trip.save();
    return res.status(200).json({ message: 'Trip updated Successfully' })
}