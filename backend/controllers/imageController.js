const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const newImage = new Image({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    });

    await newImage.save();

    res.status(201).json({
      message: 'Image uploaded successfully',
      imageUrl: `http://localhost:5001/uploads/${file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    const urls = images.map((img) => ({
      id: img._id,
      url: `http://localhost:5001${img.path}`,
    }));
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching images' });
  }
};
