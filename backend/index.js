import profileRoute from './routes/profile.js';
import postRoute from './routes/posts.js';
import likePostRoute from './routes/interactions/likePost.js';
import commentRoute from './routes/interactions/comment.js';
import followRoute from './routes/interactions/follow.js';
import uploadRoute from './routes/upload.js';
import app from './app.js';
import userRoute from './routes/users.js'

// Add your routes here
app.use('/profile', profileRoute);
app.use('/post', postRoute);
app.use('/interaction/like', likePostRoute);
app.use('/interaction/comment', commentRoute);
app.use('/upload', uploadRoute);
app.use('/user',userRoute)
app.use('/follow',followRoute)

// Listening logger
app.listen(app.get('port'), () => {
  console.log(`App is listening to port ${app.get('port')}`);
});
