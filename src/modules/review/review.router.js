import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as controller from './review.controller.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router({
    mergeParams: true
});

router.post('/', auth(['user']), asyncHandler(controller.createReview));
router.get('/', auth(['user']), asyncHandler(controller.getReviews));

export default router;