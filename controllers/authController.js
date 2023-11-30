const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });        
}

const signUp = async(req,res)=>{
    const { nome, email, senha, telefones } = req.body;

    try {
        const usuarioExistente = await User.findOne({ email });
    if(usuarioExistente){
        return res.status(400).json({ mensagem : 'Email já existente'});
    }
    //senha criptografada

    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
        nome,
        email,
        senha: hashedPassword,
        telefones,
    });
    await novoUsuario.save();

    const token = generateToken(novoUsuario._id);

    res.json({
      id: novoUsuario._id,
      data_criacao: novoUsuario.createdAt,
      data_atualizacao: novoUsuario.updatedAt,
      ultimo_login: novoUsuario.lastLogin,
      token,
    });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno ao criar usuário' });
    }
};

const signIn = async (req, res) => {
    const {email, senha } = req.body;
    try {
        const usuarioExistente = await User.findOne({ email });
        if(!usuarioExistente) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' }); 
        }

        const senhaEquivalente  = await bcrypt.compare(senha, usuarioExistente.senha);
        if (!senhaEquivalente) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
        }

        usuarioExistente.lastLogin = new Date();
        await existingUser.save();

        const token = generateToken(usuarioExistente._id);

        res.json({
            id: usuarioExistente._id,
            data_criacao: usuarioExistente.createdAt,
            data_atualizacao: usuarioExistente.updatedAt,
            ultimo_login: usuarioExistente.lastLogin,
            token,
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno ao autenticar usuário' });
    }
};

const getUser = async(req, res) => {
    try {
        // Verificar se o token está presente no cabeçalho de autenticação
        const token = req.header('Authorization').replace('Bearer ', '');
    
        if (!token) {
          return res.status(401).json({ mensagem: 'Não autorizado. Token ausente.' });
        }
    
        // Verificar se o token é válido
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decoded.userId;
        } catch (error) {
          return res.status(401).json({ mensagem: 'Não autorizado. Token inválido.' });
        }
    
        // Obter o usuário a partir do ID na variável de ambiente
        const user = await User.findById(req.userId);
        if (!user) {
          return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
    
        // Verificar se o token expirou
        const tokenExpiration = new Date(user.lastLogin.getTime() + 30 * 60 * 1000);
        const currentTime = new Date();
    
        if (currentTime > tokenExpiration) {
          return res.status(401).json({ mensagem: 'Sessão inválida. Token expirado.' });
        }
    
        res.json({
          id: user._id,
          data_criacao: user.createdAt,
          data_atualizacao: user.updatedAt,
          ultimo_login: user.lastLogin,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno ao buscar usuário' });
      }
};

module.exports = { signUp, signIn, getUser };