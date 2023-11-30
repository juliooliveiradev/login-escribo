const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://juliooliveira462:dYRzUZR0ORERTyaR@cluster0.zwcggqb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;