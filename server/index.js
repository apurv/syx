'use strict';
var chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
    require('./io')(server);   // Attach socket.io.
};

var logListenEvents = function (err, result) {
	/* eslint-disable no-console */
	if (err) {
		console.log(err);
	}

	console.log(chalk.blue('Server started on port', chalk.green(3000)));
	/* eslint-enable no-console */
}


var startServer = function () {

    var PORT = process.env.PORT || 3000;

    server.listen(PORT, 'localhost', logListenEvents);

};

startDb.then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
