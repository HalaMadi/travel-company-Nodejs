import slugify from "slugify";
import categoryModel from "../../../DB/models/category.model.js";

export const createCategory = async (req, res) => {
    const { name } = req.body;
    const slug = slugify(name);
    const userId = req.id
    const category = await categoryModel.create({ name, slug, createdBy: userId, updatedBy: userId })
    return res.status(201).json({ message: 'Success', category })
}

export const getAll = async (req, res) => {
    const categories = await categoryModel.find({})
    return res.status(200).json({ message: 'Success', categories })
}
export const getActive = async (req, res) => {
    const categories = await categoryModel.find({ status: 'active' })
    if (!categories || categories.length === 0) {
        return res.status(404).json({ message: 'No active categories found' })
    }
    return res.status(200).json({ message: 'Success', categories })
}

export const details = async (req, res) => {
    const { id } = req.params
    const category = await categoryModel.findById(id);
    if (!category) {
        return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json({ message: 'Success', category })
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.id;
    const category = await categoryModel.findById(id)
    if (!category) {
        return res.status(404).json({ message: 'Not found' })
    }
    category.name = name;
    category.slug = slugify(name);
    category.updatedBy = userId;
    await category.save();
    return res.status(200).json({ message: 'Category updated Successfully' })
}

export const removeCategory = async (req, res) => {
    const { id } = req.params
    const category = await categoryModel.findOneAndDelete(id)
    if (!category) {
        return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json({ message: 'Category Deleted Successfully' })
}