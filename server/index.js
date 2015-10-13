'use strict';

let chalk = require('chalk');

// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
let startDb = require('./db');

// Create a node server instance! cOoL!
let server = require('http').createServer();

let createApplication = () => {
    let app = require('./app');
    server.on('request', app); // Attach the Express application.
    // require('./io')(server);   // Attach socket.io.
};

let logListenEvents = (err, result) => {
	/* eslint-disable no-console */
	if (err) {
		console.log(err);
	}

	console.log(chalk.blue('Server started on port', chalk.green(3000)));
	/* eslint-enable no-console */
}


let startServer = () => {

    let PORT = process.env.PORT || 3000;

    server.listen(PORT, 'localhost', logListenEvents);

};

startDb.then(createApplication).then(startServer).catch((err) => {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
