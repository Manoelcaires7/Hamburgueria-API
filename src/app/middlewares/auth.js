import jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';


function authMiddleware(req, res, next) {
    const authToken = req.headers.authorization;
    
    if (!authToken) {
        return res.status(401).json({ error: 'TOKEN NOT PROVIDED' });
    }
    const token = authToken.split(' ')[1];

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token is invalid' });
        }
        req.userId = decoded.id;
        return next();
    });
}

export default authMiddleware;