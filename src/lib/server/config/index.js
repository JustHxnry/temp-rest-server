const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./../middleware/logger');

const defaultData = [
    { id: 1, firstName: 'Joe', lastName: 'Doe', email: 'joe@example.com', age: 42, socials: ['instagram', 'twitter', 'facebook'], gender: 'male', isAdmin: true },
    { id: 2, firstName: 'John', lastName: 'Smith', email: 'john@example.com', age: 30, socials: ['instagram'], gender: 'male', isAdmin: false },
    { id: 3, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', age: 38, socials: [], gender: 'female', isAdmin: true },
    { id: 4, firstName: 'Kyle', lastName: 'Smith', email: 'kyle@example.com', age: 24, socials: ['instagram', 'twitter', 'github', 'youtube'], gender: 'male', isAdmin: false },
    { id: 5, firstName: 'Karen', lastName: 'Foobar', email: 'karen@example.com', age: 19, socials: ['instagram', 'facebook', 'youtube'], gender: 'female', isAdmin: false },
];

module.exports = function (options) {

    let opts = {};

    opts.staticDir = fs.existsSync(path.join(process.cwd(), 'public')) ? path.join(process.cwd(), 'public') : path.join(__dirname, '..', 'public');

    opts.logger = options.enablePathLogger == true ? logger : false;

    opts.bodyParser = options.getMethodOnly == true ? false : bodyParser;

    opts.cors = options.enableCors == true ? cors({ origin: true, credentials: true }) : false;

    opts.cacheHeaders = options.enableCache == false ? function (req, res, next) {
        res.header('Cache-Control', 'no-cache');
        res.header('Pragma', 'no-cache');
        res.header('Expires', '-1');
        return next();
    } : false;

    opts.port = typeof options.hostPort == 'number' ? Number(require('./../../cli/parser').get('port')) : 3000;

    opts.customDbName = '465d4f56h465fdg4g56fd564fd4.json';

    opts.dbContent = fs.existsSync(path.join(process.cwd(), opts.customDbName)) ? JSON.parse(fs.readFileSync(path.join(process.cwd(), opts.customDbName))) : defaultData;

    return opts;
};