'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let User = mongoose.model('User');

let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


//loggedIn
router.get('/', (req, res, next) => {
  if (req.user)
    res.json(req.user);
});

//getAll
router.get('/all', (req, res, next) => {

  User.find({}).then((users) => {
    console.log("all users", users)
  })

  res.json(users);

});

// getOne
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    console.log("one user", user);
    res.json(user);
  });
});

//updateOne
router.put('/:id', (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: false})
  .then((err, user) => {
    console.log("updated user", user);
    res.json(user);
  }, (err) => {
    next(err)
  });
});


// deleteOne
router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id).then((user) => {
    console.log("deleted user", user);
    res.json(user);
  });
});
