import { Router } from 'express';
import getUserInfo from '../controllers/profiles/getUserInfo.js';

const router = new Router();

router.get('/me', getUserInfo);

export default router;
