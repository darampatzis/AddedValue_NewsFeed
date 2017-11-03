const config = require('./config');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/user');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.facebook.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
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
                    User.findOne({'facebook.id': profile.id}, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, user);
                        }
                        let newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.provider = profile.provider;
                        if (!newUser.name) {
                            /*
                             * Psaxnoume gia facebook.id. Ean den yparxei facebook.id
                             * alla yparxei name ston xristi na min apothikseusei to name
                             */
                            newUser.name = profile.displayName;
                        }
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