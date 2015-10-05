var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('lodash');
var secrets = require('./config/secrets');


var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var connect = function() {
  mongoose.connect(secrets.db, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db + '. ' + err);
    }else {
      console.log('Succeeded connected to: ' + secrets.db);
    }
  });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, passport);


app.listen(app.get('port'));


// PATCH - hides unnecessary warnings by React for non-prod environments
var warn = console.warn;
var warningFilterKey = function(warning) {
    return warning.indexOf("Warning: owner-based and parent-based contexts differ") >= 0
};
var throttledWarn = _.throttle(function() {
    warn.call(console,"Throttled warning about React owner/parent based contexts, see https://github.com/facebook/react/issues/4081 for reasons");
    warn.apply(console, arguments);
}, 60000);

console.warn = function() {
    if ( arguments && arguments.length > 0 && typeof arguments[0] === "string" && warningFilterKey(arguments[0]) ) {
        throttledWarn.apply(throttledWarn,arguments);
    }
    else {
        warn.apply(console, arguments);
    }
};
