import { Router } from "express";
import * as controller from "./category.controller.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router()

router.post('/', auth(['admin']), asyncHandler(controller.createCategory))
router.get('/', auth(['admin']), asyncHandler(controller.getAll))
router.get('/active', asyncHandler(controller.getActive))
router.get('/:id', asyncHandler(controller.details))
router.put('/:id', auth(['admin']), asyncHandler(controller.updateCategory))
router.delete('/:id', auth(['admin']), asyncHandler(controller.removeCategory))

export default router