module.exports = (router, passport) => {
    router.get('/login/itlogin', passport.authenticate('itlogin', {scope: ['cn,mail,id']}));
    router.get('/login/login/callback', function (req, res, next) {
        passport.authenticate('itlogin', function (err, user, info) {
            if (err || !user) {
                return res.redirect('/');
            }
            else {
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