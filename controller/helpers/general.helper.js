const cryptoJS = require('crypto-js');
const config = require('config');

exports.encryptPassword = (password) => cryptoJS.AES.encrypt(password, config.get('secretKeys').cryptojs);
