const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const config = require('config');

exports.encryptPassword = (password) => {
    if (password) return cryptoJS.AES.encrypt(password, config.get('secretKeys').cryptojs).toString();

    return undefined;
};

exports.decryptPassword = (cryptedPassword) => {
    const bytes = cryptoJS.AES.decrypt(cryptedPassword, config.get('secretKeys').cryptojs);

    return bytes.toString(cryptoJS.enc.Utf8);
}

exports.generateToken = (user) => {
    const { username, _id } = user;

    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                username,
                id: _id
            }
        }, config.get('secretKeys').jwt);
};