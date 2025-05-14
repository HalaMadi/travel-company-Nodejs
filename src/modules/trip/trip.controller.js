import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";
import tripModel from "../../../DB/models/trip.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const createTrip = async (req, res) => {
    try {
        const { title, categoryId } = req.body;

        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
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

    } catch (error) {
        console.error(error); // log full error for debugging
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
