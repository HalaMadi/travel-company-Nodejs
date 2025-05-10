import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './trip.controller.js'
const router=Router();

router.post('/',auth(['admin']),controller.createTrip)
export default router;