import { Router } from 'express';
import searchUser from '../controllers/users/searchUser.js';
import searchUserByName from '../controllers/users/searchUserByName.js';

const router = new Router();

router.get('/:name', searchUserByName);
router.get('/profile/:id', searchUser);

export default router;
