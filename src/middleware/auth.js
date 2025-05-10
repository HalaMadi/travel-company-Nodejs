import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";

export const auth = (accessRoles = []) => {
    return async (req, res, next) => {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).json({ message: 'Invalid token' })
        }
        const decoded = jwt.verify(token, process.env.LOGIN_SIGN);
        const user = await userModel.findById(decoded.id);
        if (!accessRoles.includes(user.role)) {
            return res.status(400).json({ message: 'not auth user' })
        }
        req.id = decoded.id
        next()
    }
}