import userModel from "../../../DB/models/user.model.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../utils/sendEmail.js";
import bcrypt from 'bcryptjs';
import { customAlphabet } from "nanoid";

export const register = async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND) || 8)
    const newUser = await userModel.create({
        userName, email, password: hashedPassword
    })
    const token = jwt.sign({ email }, process.env.CONFIRM_EMAIL)
    const html = `
                    <div style="font-family: Arial, sans-serif; text-align: center;">
                        <h2>Welcome to our platform ${userName} 👋</h2>
                        <p>Please confirm your email by clicking the button below:</p>
                        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}"
                            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; 
                            color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                            Confirm Email
                        </a>
                        <p>If you didn’t request this, you can ignore this email.</p>
                    </div>
`;
    await sendEmail(email, 'Confirm Email', html)
    return res.status(201).json({ message: "Success", user: newUser })
}
export const confirmEmail = async (req, res) => {
    const { token } = req.params
    const decode = jwt.verify(token, process.env.CONFIRM_EMAIL)
    if (!decode) {
        return res.status(404).json({ message: 'Not Authorized!' });
    }
    await userModel.findOneAndUpdate({ email: decode.email }, { confirmEmail: true })
    return res.status(200).json({ message: "Success" })

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    if (!user.confirmEmail) {
        return res.status(400).json({ message: 'Please confirm your email' });
    }
    if (user.status == 'not_active') {
        return res.status(400).json({ message: 'your account is blocked' });
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (!matchedPassword) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const token = jwt.sign({ id: user.id, userName: user.userName, role: user.role }, process.env.LOGIN_SIGN)
    return res.status(200).json({ message: 'User logged in successfully', token });
}

export const sendCode = async (req, res) => {
    const { email } = req.body;
    const code = customAlphabet('123456789abcdefABCDEF', 4)();
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code });
    if (!user) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const html = `<h2>code is ${code}</h2>`;
    await sendEmail(email, `Reset Password`, html)
    return res.status(200).json({ message: "Success" })
}

export const forgetPassword = async (req, res) => {
    const { code, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Account not registered' });
    }
    if (user.sendCode != code) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    user.password = hashedPassword
    user.sendCode = null
    await user.save()
    return res.status(200).json({ message: 'Password updated successfully' });
}