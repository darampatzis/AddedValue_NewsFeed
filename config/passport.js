const config = require('./config');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/user');
const request = require('request');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // it login
    passport.use('itlogin', new OAuth2Strategy({
            authorizationURL: config.itlogin.authUrl,
            tokenURL: config.itlogin.token,
            clientID: config.itlogin.clientID,
            clientSecret: config.itlogin.clientSecret,
            callbackURL: config.itlogin.callbackURL,
            state: true
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('accessToken = ' + accessToken);

            request('https://apps.it.teithe.gr/api/user?token=' + accessToken, function (error, response, body) {
                let profile = JSON.parse(body);
                console.log('profile = ' + profile);
                console.log('cn = ' + profile.cn);
                User.findOne({'accounts.it.id': profile.id}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);
                    }
                    let newUser = new User();
                    newUser.accounts.it.id = profile.id;
                    newUser.accounts.it.token = accessToken;
                    newUser.email = profile.mail;
                    newUser.name = profile.cn;
                    newUser.save(function (err) {
                        if (err) {
                            console.log('ERROR INSERT ' + err);
                            throw err;
                        }
                        return done(null, newUser);
                    })
                });
            });
        }
    ));

    // facebook login
    passport.use('facebook', new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'email', 'displayName']
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('accessToken = ' + accessToken);
            console.log('profile = ' + JSON.stringify(profile));
            process.nextTick(function () { // Asygxrona
                {
                    User.findOne({'accounts.facebook.id': profile.id}, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        }
                        let newUser = new User();
                        newUser.accounts.facebook.id = profile.id;
                        newUser.accounts.facebook.token = accessToken;
                        newUser.email = profile.emails[0].value;
                        newUser.name = profile.displayName;
                        newUser.save(function (err) {
                            if (err) {
                                console.log('ERROR INSERT ' + err);
                                throw err;
                            }
                            return done(null, newUser);
                        })
                    });
                }
            });
        }
    ));
};