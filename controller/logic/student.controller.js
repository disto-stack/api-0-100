const studentDto = require('../../model/dto/student.dto');
const userDto = require('../../model/dto/user.dto');

const config = require('config');

const helper = require('../helpers/general.helper');
const notificationHelper = require('../helpers/notification.helper');

exports.createStudent = (req, res, next) => {
    const { code, name, lastName, email, phone, career, password } = req.body;
    const student = {
        code,
        name,
        lastName,
        email,
        phone,
        career
    };

    studentDto.create(student, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }

        const role = config.get('roles').student;
        const user = {
            name,
            lastName,
            username: code,
            password: helper.encryptPassword(password),
            role
        };

        userDto.create(user, (error, userData) => {
            userDto.delete({_id: data.id}, (error, data) => {});
            if (error) {
                return res.status(400).json({
                    error
                })
            };

            notificationHelper.sendSMS(student.code);
            res.status(201).json({
                info: data
            })
        })
    })
}

exports.updateStudent = (req, res, next) => {
    const { code, name, lastName, email, phone, career } = req.body;
    const student = {
        code,
        name,
        lastName,
        email,
        phone,
        career
    };

    studentDto.update({ _id: req.body.id }, student, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        res.status(201).json({
            info: data
        })

    })
}

exports.getAll = (req, res, next) => {
    studentDto.getAll({}, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(200).json({
            info: data
        });
    })
}

exports.getByCode = (req, res, next) => {
    studentDto.getByCode({code: req.params.code}, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(200).json({
            info: data
        });
    });
}

exports.deleteStudent = (req, res, next) => {
    studentDto.delete({_id: req.body.id}, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(204).json();
    });
};