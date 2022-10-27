const settings = require('./cli');

module.exports.get = function (key) {

    if (key == 'jsonfilename') return null;

    if (key == 'port') return settings.port ? settings.port : 3000;

    return settings[key];

};