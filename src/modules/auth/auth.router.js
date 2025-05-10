import { Router } from 'express'
const router = Router();
import * as controller from './auth.controller.js'
import { registerSchema, loginSchema, sendCodeSchema, resetPasswordSchema } from './auth.validation.js';
import { validate } from '../../middleware/validation.js';

router.post('/register', validate(registerSchema), controller.register);
router.get('/confirmEmail/:token', controller.confirmEmail);
router.post('/login', validate(loginSchema), controller.login);
router.post('/sendCode', validate(sendCodeSchema), controller.sendCode);
router.post('/resetPassword', validate(resetPasswordSchema), controller.forgetPassword);
export default router