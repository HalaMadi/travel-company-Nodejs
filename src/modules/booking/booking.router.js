
import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './booking.controller.js'
const router=Router();

router.post('/', auth(['user']), controller.createBooking);
router.get('/', auth(['admin']), controller.getAllBookings);
router.patch('/:id', auth(['admin']), controller.updateBookingStatus);
router.put('/update/:id', auth(['user']), controller.updateBooking);
router.delete('/:id', controller.deleteBooking);
router.get('/user/:userId', auth(['user']), controller.getUserBookings);


export default router;