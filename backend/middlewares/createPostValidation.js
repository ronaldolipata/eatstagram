const createPostValidation = async (req, res, next) => {
  const { image, content } = req.body;

  if (!image) {
    return res.status(422).json({
      error: 'Image is required.',
    });
  }

  if (!content) {
    return res.status(422).json({
      error: 'Content is required.',
    });
  }

  next();
};

export default createPostValidation;
