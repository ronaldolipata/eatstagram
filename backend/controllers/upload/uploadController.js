const uploadController = (req, res) => {
  return res.status(201).json({
    message: 'Success',
    url: req.file.path,
  });
};

export default uploadController;
