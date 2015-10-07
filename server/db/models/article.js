'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postDate: { type: Date, index: true, default: Date.now },
  content: String,
  tags: [String],
  share: {},
  comments: [{}],
  rev: [{}],
  media: {}
});

mongoose.model('Article', schema);
