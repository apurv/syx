'use strict';

let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  title: String,
  subtitle: String,
  category: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postDate: { type: Date, index: true, default: Date.now },
  content: String,
  tags: [String],
  share: {},
  comments: [{}],
  revision: [{}],
  media: {}
});

mongoose.model('Article', schema);
