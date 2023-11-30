const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://juliooliveira462:qbaoKlMsTqKtkgXY@cluster0.zwcggqb.mongodb.net/login-escribo.Usuario?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;