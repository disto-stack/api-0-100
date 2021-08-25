const mongoose = require('mongoose');
const config = require('config');

const { host, user, password, dbName } = config.get("db-connections.mongodb");

const connectionString = `mongodb+srv://${user}:${password}@${host}/${dbName}`;

module.exports = () => {
    mongoose.connect(connectionString);

    mongoose.connection.on("connected", () => {
        console.log('Mongodb server online');
    });

    mongoose.connection.on("disconnected", () => {
        console.log('Mongodb server offline');
    });

    mongoose.connection.on("error", () => {
        console.log('Mongodb server connection error');
    });

    mongoose.connection.on("SIGNINT", () => {
        mongoose.connection.close(() => {
            console.log('Mongodb server shutting down');
        });
    });
}