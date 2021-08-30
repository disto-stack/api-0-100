const cryptoJS = require('crypto-js');
const config = require('config');

exports.encryptPassword = (password) => {
    if (password) {
        const encryptedPassword = cryptoJS.AES.encrypt(password, config.get('secretKeys').cryptojs).toString();
        return encryptedPassword;
    }

    return undefined;
};
