const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
        if (err || !user) {
            return res.redirect('/');
        }
        else {
            console.log('herererere');
            console.log(user);
            req.session.auth = true;
            req.session.user = user;
            res.redirect('/')
        }
    })(req, res, next);
});

router.get('/', function (req, res) {

});
module.exports = router;