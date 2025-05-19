import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './coupon.controller.js'
const router = Router()

router.post('/',auth(['admin']),controller.createCoupon)
router.get('/',auth(['admin']),controller.getCoupons)
router.delete('/:id',auth(['admin']),controller.remove)
router.put('/:id',auth(['admin']),controller.update)


export default router