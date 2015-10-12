'use strict';
let path = require('path');
let chalk = require('chalk');
let util = require('util');

let rootPath = path.join(__dirname, '../../../');
let indexPath = path.join(rootPath, './server/app/views/index.html');
let faviconPath = path.join(rootPath, './server/app/views/favicon.ico');

let env = require(path.join(rootPath, './server/env'));

let logMiddleware = (req, res, next) => {
    util.log(('---NEW REQUEST---'));
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    next();
};

module.exports = (app) => {
    app.setValue('env', env);
    app.setValue('projectRoot', rootPath);
    app.setValue('indexHTMLPath', indexPath);
    app.setValue('faviconPath', faviconPath);
    app.setValue('log', logMiddleware);
};
