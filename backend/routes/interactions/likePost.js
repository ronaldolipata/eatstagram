import { Router } from 'express';
import getLikeStatus from '../../controllers/interactions/likes/getLikeStatus.js';
import likePost from '../../controllers/interactions/likes/likePost.js';
import updatePost from '../../controllers/interactions/likes/updatePost.js';
import unlikePost from '../../controllers/interactions/likes/unlikePost.js';

const router = new Router();

router.get('/:id', getLikeStatus);
router.post('/:id', likePost);
router.patch('/:id', updatePost);
router.delete('/:id', unlikePost);

export default router;
