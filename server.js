// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

mongoose.connect('mongodb://127.0.0.1:27017/login-escribo');

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Erro na conexão:'));
connection.once('open', () => {
  console.log('Conectado ao MongoDB!');
});
