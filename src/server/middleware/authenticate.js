const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretValue';

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,JWT_SECRET)
        req.user = decode;
        next();
    }catch(err) {
        res.json({
            message: 'Authentication Failed!'
        })
    }
}