const express = require('express');
const router = express.Router();

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: '1919765821621998',
        clientSecret: 'e581b9dffa5feb3a1ae9ffbfdb4f2b3b',
        callbackURL: "http://zeus-zg.ddns.net/login/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('accessToken = ' + accessToken )
        console.log('profile = ' + JSON.stringify(profile) )
        done(null,profile);
    }
));




router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if(err || !user){
            return res.redirect('/');
        }
        else {
            console.log('herererere')
            req.session.auth = true;
            req.session.user = user;
            res.redirect('/')
        }
    })(req, res, next);
});

router.get('/', function (req, res) {

});


module.exports = router;