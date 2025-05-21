import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './trip.controller.js'
import fileUpload, { fileValidation } from "../../utils/multer.js";
import reviewsRouter from '../review/review.router.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.use('/:tripId/reviews', reviewsRouter)
router.post('/', auth(['admin']), fileUpload(fileValidation.Image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 }
]), asyncHandler(controller.createTrip))
router.get('/', auth(['admin']), asyncHandler(controller.getAllTrips))
router.get('/available', asyncHandler(controller.getAvailableTrips))
router.get('/:id', asyncHandler(controller.detailsTrip))
router.put('/:id', auth(['admin']), asyncHandler(controller.updateTrip))
router.delete('/:id', auth(['admin']), asyncHandler(controller.deleteTrip))

export default router;