const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/login-escribo');

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Erro na conexão:'));
connection.once('open', () => {
  console.log('Conectado ao MongoDB!');
});

module.exports = mongoose;
