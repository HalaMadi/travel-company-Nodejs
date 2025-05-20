import couponModel from "../../../DB/models/coupon.model.js"

export const createCoupon = async (req, res) => {
    const { name } = req.body
    const coupon = await couponModel.findOne({ name })
    if (coupon) {
        return res.status(400).json({ message: 'Coupon already exists' })
    }
    req.body.expiredDate = new Date()
    req.body.createdBy = req.id
    req.body.updatedBy = req.id
    const newCoupon = await couponModel.create(req.body)
    return res.status(201).json({ message: 'Coupon created successfully', newCoupon })
}

export const getCoupons = async (req, res) => {
    const coupons = await couponModel.find()
    if (!coupons) {
        return res.status(404).json({ message: 'No coupons found' })
    }
    return res.status(200).json({ message: 'Coupons retrieved successfully', coupons })
}

export const update = async (req, res) => {
    const { id } = req.params
    const { name, amount } = req.body
    const userId = req.id
    if (!name || !amount) {
        return res.status(400).json({ message: 'Missed Required Data' })
    }
    const coupon = await couponModel.findByIdAndUpdate(id, {
        name, amount, updatedBy: userId
    },{new:true})
    if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' })
    }
    return res.status(200).json({ message: 'Coupon updated successfully', coupon })
}
export const remove = async (req, res) => {
    const { id } = req.params
    const coupon = await couponModel.findByIdAndDelete(id)
    if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' })
    }
    return res.status(200).json({ message: 'Coupon deleted successfully', coupon })
}