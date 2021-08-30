const controller = require('../controller/logic/period.controller');

module.exports = (app) => {
    app.get('/period', (req, res, next) => {
        controller.getAll(req, res, next);
    });
    
    app.post('/period', (req, res, next) => {
        controller.createTeacher(req, res, next);
    });

    app.put('/period', (req, res, next) => {
        controller.updateTeacher(req, res, next);
    });

    app.delete('/period', (req, res, next) => {
        controller.deleteTeacher(req, res, next);
    });

}