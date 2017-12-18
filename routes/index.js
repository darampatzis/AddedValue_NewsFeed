const express = require('express');
const router = express.Router();
const webhoseio = require('../config/Webhose');
const User = require('../model/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    // if parameter exists in index, redirect to route /search
    if (Object.keys(req.query).length != 0) {
        res.redirect('/search?q=' + req.query.q);
    }
    // if the user is logged in, show news according to its preferences
    if (req.session.auth) {
        const authProvider = req.session.authProvider;
        const user = req.session.user;
        User.findOne({'authProvider.id': 'user.id'}, function (err) {
            let rawQuery = '';
            if (authProvider === 'facebook') {
                rawQuery = user.facebook.pref;
            } else {
                rawQuery = user.it.pref;
            }
            let query = '';
            for (let i in rawQuery) {
                query += '"' + rawQuery[i] + '" OR ';
            }
            query = query.replace((/ OR $/), '');
            console.log('Query to search = ' + query);
            webhoseio.client.query('filterWebContent', webhoseio.makeQuery(query, 'news')).then(output => {
                res.render('index', {
                    title: 'Express',
                    output: output,
                    login: req.session.auth,
                    user: req.session.user,
                    authProvider: req.session.authProvider
                });
            });
        });
    } else {
        // else show random stuff
        webhoseio.client.query('filterWebContent', webhoseio.makeQuery('language:greek', 'news')).then(output => {
            console.log('GET / - fortosi selidas XWRIS paramertous');
            console.log('passport user = = ' + JSON.stringify(req.session.user));
            res.render('index', {
                title: 'Express',
                output: output,
                login: req.session.auth,
                user: req.session.user
            });
        })
    }
});

router.get('/search', (req, res, next) => {
    const query = req.sanitize(req.query.q);
    // User's input is being sanitized
    console.log('GET /q=' + query + ' - fortosi selidas ME paramertous');
    if (!query) {
        console.log('ERROR RETURN');
        next();
    } else {
        webhoseio.client.query('filterWebContent', webhoseio.makeQuery(query, 'news')).then(output => {
            res.render('index', {
                title: 'Express',
                output: output,
                login: req.session.auth,
                user: req.session.user,
                authProvider: req.session.authProvider
            });
        })
    }
}, (req, res) => {
    // if error, send status "404" and text "Not Found!"
    res.status(404).send('Not Found!');
});

router.post('/getNext', (req, res, next) => {
    // Get next batch of posts for pagination
    webhoseio.client.getNext().then(output => {
        res.send(output);
    });
});


router.get('/logout', (req, res, next) => {
    // Get next batch of posts for pagination
    req.session.destroy(function(err) {
        res.redirect('/');
    })
});
module.exports = router;