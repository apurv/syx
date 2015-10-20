"use strict";
let path = require('path');
let express = require('express');
let favicon = require('serve-favicon');

module.exports = (app) => {

    let root = app.getValue('projectRoot');

    let npmPath = path.join(root, './node_modules');
    let publicPath = path.join(root, './public');
    let browserPath = path.join(root, './browser');
    let assetsPath = path.join(root, './assets');

    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));
    app.use(express.static(assetsPath));

};
