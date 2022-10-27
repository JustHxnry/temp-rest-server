module.exports = function (req, res, next) {
    var response = `[${new Date().toLocaleString()}] ${req.method} ${req.url}`;
    console.log(response);
    return next();
};