const configs = require('./../config');

module.exports = (options) => {
    const defaults = configs({
        enablePathLogger: true,
        getMethodOnly: false,
        enableCache: false,
        hostPort: options.port ? Number(options.port) : 3000,
        dbFileName: options.dbName ? options.dbName : null,
    });

    return defaults;
};