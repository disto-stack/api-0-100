const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app = express();
const port = config.get('server-port');

const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

app.use(jsonParser);
app.use(urlEncodedParser);

const ipLocator = require('./middleware/getIpAdress');
app.use('*', ipLocator);

app.get('/', (req, res, next) => {
    res.send(`
        <h1>Welcome to REST-API</h1>
    `)
});

const userRoutes = require('./routes/user.routes');
userRoutes(app);

const verifyToken = require('./middleware/verifyToken');
app.use(verifyToken);

const studentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');
const periodRoutes = require('./routes/period.routes');
const courseRoutes = require('./routes/course.routes');

studentRoutes(app);
teacherRoutes(app);
periodRoutes(app);
courseRoutes(app);

app.listen(port, () => {
    console.log('Server running on port', port);
});