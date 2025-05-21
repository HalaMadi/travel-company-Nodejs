import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './coupon.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router()

router.post('/', auth(['admin']), asyncHandler(controller.createCoupon))
router.get('/', auth(['admin']), asyncHandler(controller.getCoupons))
router.delete('/:id', auth(['admin']), asyncHandler(controller.remove))
router.put('/:id', auth(['admin']), asyncHandler(controller.update))


export default router