'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/articles', require('./articles'));
router.use('/toolPanel', require('./toolPanel'));

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
    res.status(404).end();
});
