'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var gitHubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: gitHubConfig.clientID,
        clientSecret: gitHubConfig.clientSecret,
        callbackURL: gitHubConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        // console.log('hit verifyCallback', profile);

        UserModel.findOne({ 'github.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        username: profile.username,
                        email: profile.emails[0].value || '',
                        role: 'user',
                        profile: {
                          name: profile._json.name || '',
                          location: profile._json.location || '',
                          website: profile._json.blog || '',
                          picture: profile._json.avatar_url || ''
                        },
                        github: {
                            id: profile.id
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from GitHub authentication', err);
                done(err);
            });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github',
      passport.authenticate('github'));

    app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

};
