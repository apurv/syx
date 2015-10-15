'use strict';
let router = require('express').Router();
let _ = require('lodash');
let mongoose = require('mongoose');
let Article = mongoose.model('Article');
let multer = require('multer');
let upload = multer({dest: 'uploads/'});

module.exports = router;

router.post('/:id', (req, res, next) => {
	Article.findById(req.params.id).then((article) => {
		console.log('the article: ', article);
		res.json(article);
	});
});