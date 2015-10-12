'use strict';


let crypto = require('crypto');
let mongoose = require('mongoose');

let schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  password: String,
  role: String, // admin, user, anon
  salt: { type: String },
  createdAt: { type: Date, index: true, default: Date.now },
  profile: {
    name: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
  github: { id: String }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
let generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

let encryptPassword = function (plainText, salt) {
    let hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);
