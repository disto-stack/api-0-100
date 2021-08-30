const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const accessToken = req.headers['access-token'];

    if (!accessToken) {
        return res.status(400).json({
            message: 'Not access token set'
        });
    };

    const decodedToken = jwt.verify(accessToken, config.get('secretKeys').jwt);
    const currentDate = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentDate) {
        return res.status(400).json({
            message: 'This token is expired'
        });
     };
    
    next();
}