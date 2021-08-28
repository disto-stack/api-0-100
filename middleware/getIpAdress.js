module.exports = (req, res, next) => { 
    console.log(`Client ip:`, req.connection.remoteAddress);
    next();
}