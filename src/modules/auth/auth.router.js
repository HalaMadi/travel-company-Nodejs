import { Router } from 'express'
const router = Router();
import * as controller from './auth.controller.js'
import { registerSchema, loginSchema, sendCodeSchema, resetPasswordSchema } from './auth.validation.js';
import { validate } from '../../middleware/validation.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

router.post('/register', validate(registerSchema), asyncHandler(controller.register));
router.get('/confirmEmail/:token', asyncHandler(controller.confirmEmail));
router.post('/login', validate(loginSchema), asyncHandler(controller.login));
router.post('/sendCode', validate(sendCodeSchema), asyncHandler(controller.sendCode));
router.post('/resetPassword', validate(resetPasswordSchema), asyncHandler(controller.forgetPassword));
export default router