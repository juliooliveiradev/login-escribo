const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {type: String, required: true },
    email: { type: String, unique: true, required: true},
    senha: { type: String, required: true},
    telefone:[
        {
            numero: { type: String, required: true},
            ddd:{ type: String, required: true},
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLogin: {type: Date},
});

const User = mongoose.model('User', userSchema);

module.exports = User;