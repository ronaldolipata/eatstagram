import { Router } from 'express';
import createPost from '../controllers/posts/createPost.js';
import showAllPosts from '../controllers/posts/showAllPosts.js';
import showAllUserPosts from '../controllers/posts/showAllUserPosts.js';
import viewPost from '../controllers/posts/viewPost.js';
import updatePost from '../controllers/posts/updatePost.js';
import deletePost from '../controllers/posts/deletePost.js';
import updatePostUserIdValidtion from '../middlewares/updatePostUserIdValidtion.js';
import createPostValidation from '../middlewares/createPostValidation.js';

const router = new Router();

router.get('/', showAllPosts);

router.get('/users/:id/posts', showAllUserPosts);

router.post('/', createPostValidation, createPost);

// @Todo add validateObjectIdMiddleware to view post route
router.get('/:id', viewPost);

router.patch('/:id', updatePostUserIdValidtion, updatePost);

router.delete('/:id', deletePost);

export default router;
