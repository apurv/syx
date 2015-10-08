'use strict';
let path = require('path');
let express = require('express');
let app = express();

let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");
let webpackHotMiddleware = require("webpack-hot-middleware");

let config = require("../../webpack.config");

let devMiddlewareOptions = {
	noInfo: true,
	publicPath: config.output.publicPath
};

let compiler = webpack(config);
let hmrMiddleware = webpackHotMiddleware(compiler);
let devMiddleware = webpackDevMiddleware(compiler, devMiddlewareOptions);


module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

app.use(devMiddleware);
app.use(hmrMiddleware);

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));


/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use((req, res, next) => {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', (req, res) => {
    res.sendFile(app.get('indexHTMLPath'));
});

// Error catching endware.
app.use((err, req, res, next) => {
    console.error(err, typeof next);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
