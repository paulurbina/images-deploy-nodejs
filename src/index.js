if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');

// Initializations
const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views')); //indicarle al servidor que aqui esta los views
app.set('view engine', 'ejs');

// Midllewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage: storage
}).single('image'));


// Variables Global
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});


// Routes
app.use(require('./routes/index'));


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});