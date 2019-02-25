const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://QRSTUVWXYZ0123456789:mgNEP7vgo4@cluster0-esjfk.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
    .then(db => console.log('MONGODB ATLAS is connected'))
    .catch(err => console.error(err));  