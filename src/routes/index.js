const express = require('express');
const router = express.Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Image = require('../models/image');

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
 * /-----------------------------
 */

/**
 * 
 * 
 * UPLOAD IMAGE
 */

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.originalname;
    image.size = req.file.size;

    await image.save();

    res.redirect('/');
});

/**
 * -----------------------------
 */

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
    await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/');
});

module.exports = router;