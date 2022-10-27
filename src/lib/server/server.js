module.exports = function (opts) {

    const express = require('express');
    const app = express();
    const routes = require('./modules/routes');

    routes(app, opts);

    let servingPort;

    if (opts.port != null && typeof Number(opts.port) == 'number') servingPort = Number(opts.port);
    if (opts.port == null) servingPort = Number(3000);

    app.listen(Number(servingPort), () => {
        console.log(`[${new Date().toLocaleString()}] Server started listening on port ${servingPort}`);
    });
};