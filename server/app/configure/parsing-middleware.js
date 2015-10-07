'use strict';
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

module.exports = (app) => {

    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
    app.use(cookieParser());

    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};
