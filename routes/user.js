const express = require('express');
const router = express.Router();

router.get('/addpref', (req, res, next) => {
    res.render('addPref', {
        login: req.session.auth,
        user: req.session.user
    });
});


router.post('/addpref', (req, res, next) => {
    res.send(req.body.data);
});

module.exports = router;