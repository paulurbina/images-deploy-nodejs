const express = require('express');
const router = express.Router();
const { unlink } = require('fs-extra');

const Image = require('../models/image');
const cloudinary = require('cloudinary');

//CONFIG CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * 
 * 
 * LIST IMAGES TOTAL
 */

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});

/**
 * 
 * 
 * UPLOAD IMAGE
 */

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {

    const { title, description } = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(result);
    const newImage = new Image({
        title,
        description,
        originalname:req.file.originalname,
        mimetype: result.type,
        path: result.url,
        size:result.bytes,
        public_id: result.public_id
    });
    await newImage.save();
    await unlink(req.file.path);
    res.redirect('/');
});
 /**
  * 
  * 
  * 
  * 
  */
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    console.log(image);
    res.render('profile', { image });
});
/**
 * 
 * 
 * IMAGE DELETED
 */
router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image =  await Image.findByIdAndDelete(id);
    await cloudinary.v2.uploader.destroy(image.public_id);
    // await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/');
});

module.exports = router;