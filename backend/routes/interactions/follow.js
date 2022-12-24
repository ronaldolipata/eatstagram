import { Router } from 'express';
import follow from '../../controllers/interactions/follow/follow.js';
import followers from '../../controllers/interactions/follow/followers.js';
import following from '../../controllers/interactions/follow/following.js';
import getFollowStatus from '../../controllers/interactions/follow/getFollowStatus.js';
import unfollow from '../../controllers/interactions/follow/unfollow.js';


const router = new Router();

router.get('/followStatus/:id', getFollowStatus);
router.post('/follow/:id', follow);
router.delete('/unfollow/:id', unfollow);
router.get('/following/:id', following);
router.get('/followers/:id', followers);


export default router;
