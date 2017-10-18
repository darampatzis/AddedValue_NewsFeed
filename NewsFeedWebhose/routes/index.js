const express = require('express');
const router = express.Router();
const webhoseio = require('../config/Webhose');

/* GET home page. */
router.get('/', function (req, res, next) {
    webhoseio.client.query('filterWebContent', webhoseio.defaultParams).then(output => {
        console.log(output['posts'][0]['text']);
        res.status(200).render('index', {title: 'Express', output: output});
    });
});

router.get('/:keys', (req, res, next) => {
    var keywords = req.params.keys;
    if (!keywords) {
        console.log('ERROR RETURN');
        next();

    } else {
        var urlParams = {
            'q': ' "' + keywords + '"',
            'sort': 'crawled'
        };
        webhoseio.client.query('filterWebContent', urlParams).then(output => {
            console.log(output['posts'][0]['text']);
            res.status(200).render('index', {output: output});
        })
    }
}, (req, res) => {
    res.status(404).send('ERROR!');
});

module.exports = router;