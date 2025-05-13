import { Router } from "express";
import * as controller from "./category.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router()

router.post('/', auth(['admin']), controller.createCategory)
router.get('/', auth(['admin']), controller.getAll)
router.get('/active', controller.getActive)
router.get('/:id', controller.details)
router.put('/:id', auth(['admin']), controller.updateCategory)
router.delete('/:id', auth(['admin']), controller.removeCategory)

export default router