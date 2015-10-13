'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let Article = mongoose.model('Article');

//getAll
router.get('/', (req, res, next) => {

  // TODO: Add category search
  Article.find({}).populate('author').then((articles) => {
    let resArticles = _.map(articles, (article) => {
      let newArticle = article.toJSON();
      delete newArticle.author.salt;
      delete newArticle.author.password;
      return newArticle;
    })
    res.json(articles);
  });
});

// getOne
router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id).then((article) => {
    console.log("one article", article);
    res.json(article);
  });
});

//updateOne
router.put('/:id', (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: false})
  .then((err, article) => {
    console.log("updated article", article);
    res.json(article);
  }, (err) => {
    next(err)
  });
});


// deleteOne
router.delete('/:id', (req, res, next) => {
  Article.findByIdAndRemove(req.params.id).then((article) => {
    console.log("deleted article", article);
    res.json(article);
  });
});


// getByCategory
//
// updateOne
//
// deleteOne
