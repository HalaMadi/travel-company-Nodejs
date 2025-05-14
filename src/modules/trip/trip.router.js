import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './trip.controller.js'
import fileUpload, { fileValidation } from "../../utils/multer.js";
const router=Router();

router.post('/',auth(['admin']),fileUpload(fileValidation.Image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:4}
]),controller.createTrip)

export default router;