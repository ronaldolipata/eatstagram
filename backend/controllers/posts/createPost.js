import Post from '../../models/Post.js';

const createPost = async (req, res) => {
  const { image, content } = req.body;

  // Create New Post from body
  const newPost = new Post({
    image,
    content,
    userId: req.currentUser, // 👈 Check currentUserMiddleware
  });

  try {
    // Save post to the database
    const post = await newPost.save();

    return res.status(201).json(post);
  } catch (error) {
    // Throw an error message
    return res.status(400).json({ error: error.message });
  }
};

export default createPost;
