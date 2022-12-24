import { Router } from 'express';
import viewComment from '../../controllers/interactions/comments/viewComment.js';
import viewAllComments from '../../controllers/interactions/comments/viewAllComments.js';
import addComment from '../../controllers/interactions/comments/addComment.js';

const router = new Router();

// router.get('/comments/:id', viewComment);

router.get('/post/:id/comments', viewAllComments);

// router.post('/posts/:postId/comments', addComment);

// router.get('/:postId/:commentId', viewComment);
router.post('/post/:id/comments', addComment);

export default router;
