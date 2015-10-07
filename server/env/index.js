'use strict';
let path = require('path');
let devConfigPath = path.join(__dirname, './development.js');
let productionConfigPath = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else {
    module.exports = require(devConfigPath);
}
