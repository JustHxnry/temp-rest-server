#!/usr/bin/env node

process.removeAllListeners('warning');

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
let argv = yargs(hideBin(process.argv));

const { startServer: serve } = require('./../../index');

let settings = {
    port: null
};

argv = argv.option('port', {
    alias: 'p',
    describe: 'Choose a custom port',
    default: 3000,
    type: 'number',
    defaultDescription: 'Default web server port is 3000'
})
    .parse();

settings.port = Number(argv.port);

serve(settings);

module.exports = settings;