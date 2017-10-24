const express = require('express');
const router = express.Router();
const webhoseio = require('../config/Webhose');
const osLocale = require('os-locale');
let os_locale;

osLocale().then(locale => {
    os_locale = locale.replace('[a-z]/g', '');
});

/* GET home page. */
router.get('/', function (req, res) {
    //if its not logged in show random stuff
    //else show its selection
    if (Object.keys(req.query).length != 0) {
        // Ean sto index yparxei parametros kanei redirect sto /search route
        res.status(200).redirect('/search?q=' + req.query.q);
    } else {
        webhoseio.client.query('filterWebContent', webhoseio.makeQuery('', 'news')).then(output => {
            console.log('GET / - fortosi selidas XWRIS paramertous');
            console.log('passport user = ='+ JSON.stringify(req.user))
            res.status(200).render('index', {title: 'Express', output: output, login:req.session.auth , user:req.session.user });
        });
    }
});

router.get('/search', (req, res, next) => {
    const query = req.sanitize(req.query.q);
    // Ginete sanitize to input tou xristi
    console.log('GET /q=' + query + ' - fortosi selidas ME paramertous');
    if (!query) {
        console.log('ERROR RETURN');
        next();
    } else {
        webhoseio.client.query('filterWebContent', webhoseio.makeQuery(query, 'news')).then(output => {
            res.status(200).render('index', {output: output});
        })
    }
}, (req, res) => {
    res.status(404).send('Not Found!');
});

module.exports = router;