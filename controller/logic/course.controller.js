const courseDto = require('../../model/dto/course.dto');

exports.createCourse = (req, res, next) => {
    const { code, name } = req.body;
    const course = {
        code,
        name
    };

    courseDto.create(course, (error, data) => {
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

exports.updateCourse = (req, res, next) => {
    const { code, name } = req.body;
    const course = {
        code,
        name
    };

    courseDto.update({ _id: req.body.id }, course, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }

        res.status(201).json({
            info: data
        });
    })
};

exports.getAll = (req, res, next) => {
    courseDto.getAll({}, (error, data) => {
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

exports.getByCode = (req, res, next) => {
    courseDto.getByCode({code: req.params.code}, (error, data) => {
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


exports.deleteCourse = (req, res, next) => {
    courseDto.delete({ _id: req.body.id }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(204).json();
    });
};