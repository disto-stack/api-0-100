const userDto = require('../../model/dto/user.dto');

const helper = require('../helpers/general.helper');

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    userDto.login({ username: username }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        if (data.length > 0) {
            const decryptedPassword = helper.decryptPassword(data[0].password);

            if (password === decryptedPassword) {
                res.status(200).json({
                    token: helper.generateToken(data[0])
                });

            } else {
                return res.status(400).json({
                    info: 'Invalid password'
                })
            }

        } else {
            return res.status(400).json({
                info: 'Username not found'
            })
                
        }
    });
};

exports.getAll = (req, res, next) => {
    userDto.getAll({}, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(200).json({
            info: data
        });
    })
};