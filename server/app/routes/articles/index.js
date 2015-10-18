'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let Article = mongoose.model('Article');
import articleTemplate from '../templates/articleTemplate';

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
    console.log("GET one article", article);
    res.json(article);
  });
});

//updateOne
router.put('/:id', (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: false, new: true})
  .then((article, err) => {
    console.log("updated article", article);
    res.json(article);
  }, (err) => {
    next(err)
  });
});

//addArticle
router.post('/', (req, res, next) => {
  let newArticle = _.merge(articleTemplate, req.body);
  // console.log('merge result of new article', newArticle)

  Article.create(newArticle)
  .then((article, err) => {
    console.log("created article", article);
    // res.redirect(301, '/api/articles/' + article._id);
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
