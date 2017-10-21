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
    webhoseio.client.query('filterWebContent', webhoseio.makeQuery('','news')).then(output => {
        console.log('GET / - fortosi selidas XWRIS paramertous');
        res.status(200).render('index', {title: 'Express', output: output});
    });
});

router.get('/search', (req, res, next) => {
    const query = req.query.q;
    console.log('GET /q=' + query + ' - fortosi selidas ME paramertous');
    if (!query) {
        console.log('ERROR RETURN');
        next();
    } else {

        webhoseio.client.query('filterWebContent', webhoseio.makeQuery(query,'news')).then(output => {
            res.status(200).render('index', {output: output});
        })
    }
}, (req, res) => {
    res.status(404).send('ERROR!');
});

module.exports = router;