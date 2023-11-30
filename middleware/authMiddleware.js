const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Não autorizado' });
    }
};

module.exports = authMiddleware;