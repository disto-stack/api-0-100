const periodDto = require('../../model/dto/period.dto');

exports.createPeriod = (req, res, next) => {
    const { year, number, current } = req.body;
    const period = {
        year,
        number,
        current
    };

    periodDto.create(period, (error, data) => {
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

exports.updatePeriod = (req, res, next) => {
    const { year, number, current } = req.body;
    const period = {
        year,
        number,
        current
    };

    periodDto.update({ _id: req.body.id }, period, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }

        res.status(201).json({
            info: data
        });
    })
}

exports.getAll = (req, res, next) => {
    periodDto.getAll({}, (error, data) => {
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

exports.deletePeriod = (req, res, next) => {
    periodDto.delete({ _id: req.body.id }, (error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        };

        res.status(204).json();
    });
};