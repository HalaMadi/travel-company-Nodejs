
import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './booking.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.post('/', auth(['user']), asyncHandler(controller.createBooking));
router.get('/', auth(['admin']), asyncHandler(controller.getAllBookings));
router.patch('/:id', auth(['admin']), asyncHandler(controller.updateBookingStatus));
router.put('/update/:id', auth(['user']), asyncHandler(controller.updateBooking));
router.delete('/:id', asyncHandler(controller.deleteBooking));
router.get('/user/:userId', auth(['user']), asyncHandler(controller.getUserBookings));

export default router;