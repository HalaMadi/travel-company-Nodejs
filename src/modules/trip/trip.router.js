import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './trip.controller.js'
import fileUpload, { fileValidation } from "../../utils/multer.js";
const router=Router();

router.post('/',auth(['admin']),fileUpload(fileValidation.Image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),controller.createTrip)
router.get('/',auth(['admin']),controller.getAllTrips)
router.get('/available',controller.getAvailableTrips)
router.get('/:id',controller.detailsTrip)
router.put('/:id',auth(['admin']),controller.updateTrip)
router.delete('/:id',auth(['admin']),controller.deleteTrip)

export default router;