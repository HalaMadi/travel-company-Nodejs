
import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './booking.controller.js'
const router=Router();

router.post('/', auth(['user']), controller.createBooking);
router.get('/', auth(['admin']), controller.getAllBookings);
router.get('/:id', auth(['user', 'admin']), controller.getBookingById);
router.patch('/:id', auth(['admin']), controller.updateBookingStatus);
router.delete('/:id', auth(['admin', 'user']), controller.deleteBooking);
router.get('/user/:userId', auth(['user']), controller.getUserBookings);


export default router;