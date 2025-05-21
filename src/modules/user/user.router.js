import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './user.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.get('/', auth(['user','admin']), asyncHandler(controller.profile))
router.put('/', auth(['user','admin']), asyncHandler(controller.updateProfile))
router.delete('/', auth(['user','admin']), asyncHandler(controller.deleteProfile))
router.get('/all', auth(['admin']), asyncHandler(controller.getAllUsers))

export default router;