const config = require('./config')
const OAuth2Strategy = require('passport-oauth2').Strategy;
const User = require('../model/user');
const request = require('request');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.facebook.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

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

                User.findOne({'itId': profile.id}, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);
                    }
                    let newUser = new User();
                    newUser.itId = profile.id;
                    newUser.token = accessToken;
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
};