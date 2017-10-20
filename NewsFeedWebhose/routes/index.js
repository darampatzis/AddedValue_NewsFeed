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
    webhoseio.client.query('filterWebContent', webhoseio.defaultParams).then(output => {
        console.log('GET / - DILADI OTAN FORTONETAI I SELIDA XWRIS PARAMETROUS');
        res.status(200).render('index', {title: 'Express', output: output});
    });
});

router.get('/q=:query', (req, res, next) => {
    const query = req.params.query;
    console.log('GET /q=' + query + ' - FORTONETAI I SELIDA ME PARAMETROUS');
    if (!query) {
        console.log('ERROR RETURN');
        next();
    } else {
        let urlParams = {
            /*
            'q': ' "' + req.body.q + '" language:' + req.body.language +
            ' site_type:"' + req.body.site_type + '" thread.country:' + os_locale + '',
            'sort': req.body.sort
            */
            'q': ' "' + query + '" language:english site_type:"news" thread.country:US -site:kerkida.net',
            'sort': "crawled"
        };
        webhoseio.client.query('filterWebContent', urlParams).then(output => {
            console.log(output['posts'][0]['title']);
            res.status(200).render('index', {output: output});
        })
    }
}, (req, res) => {
    res.status(404).send('ERROR!');
});

module.exports = router;