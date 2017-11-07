module.exports = (router, passport) => {
    router.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}));
    router.get('/login/facebook/callback', function (req, res, next) {
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
};