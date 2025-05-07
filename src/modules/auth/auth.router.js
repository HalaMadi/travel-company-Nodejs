import { Router } from 'express'
const router = Router();
import * as controller from './auth.controller.js'

router.post('/register', controller.register);
router.get('/confirmEmail/:token', controller.confirmEmail);
router.post('/login', controller.login);
router.post('/sendCode', controller.sendCode);

export default router