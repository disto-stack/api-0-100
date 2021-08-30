const teacherDto = require('../../model/dto/teacher.dto');
const userDto = require('../../model/dto/user.dto');

const config = require('config');

const helper = require('../helpers/general.helper');
const notificationHelper = require('../helpers/notification.helper');

exports.createTeacher = (req, res, next) => {
    const { document, name, lastName, email, phone, office, password, department } = req.body;
    const teacher = {
        document,
        name,
        lastName,
        email,
        phone,
        office,
        department
    };

    teacherDto.create(teacher, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }

        const role = config.get('roles').teacher;
        const user = {
            name,
            lastName,
            username: document,
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

            notificationHelper.sendSMS(teacher.phone);
            res.status(201).json({
                info: data
            })
        })
    })
}

exports.updateTeacher = (req, res, next) => {
    const { document, name, lastName, email, phone, office, department, oldDocument, password } = req.body;
    const teacher = {
        document,
        name,
        lastName,
        email,
        phone,
        office,
        department
    };

    teacherDto.update({ _id: req.body.id }, teacher, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }

        if (oldDocument) {
            const role = config.get('roles').teacher;
            const user = {
                name,
                lastName,
                username: document,
                password: helper.encryptPassword(password),
                role
            };
    
            userDto.update({username: oldDocument}, user, (error, userData) => {
                if (error) {
                    return res.status(400).json({
                        error
                    })
                };
    
                notificationHelper.sendSMS(teacher.phone);
                res.status(201).json({
                    info: data
                })
            })
        }
    })
}

exports.getAll = (req, res, next) => {
    teacherDto.getAll({}, (error, data) => {
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

exports.getByDocument = (req, res, next) => {
    teacherDto.getByCode({code: req.params.document}, (error, data) => {
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

exports.deleteTeacher = (req, res, next) => {
    teacherDto.delete({_id: req.body.id}, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            });
        };

        userDto.delete({ username: data.document }, (error, userData) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            };

            res.status(204).json();
        })

    });
};