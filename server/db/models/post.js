'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var moment = require('moment');

var schema = new mongoose.Schema({
    title: String,

    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    createdAt: { type: Date, index: true, default: Date.now },

    content: String,

    tags: [String],

    share: {},

    comments: [{}],

    rev: [{}],

    media: {}
});


mongoose.model('Post', schema);
