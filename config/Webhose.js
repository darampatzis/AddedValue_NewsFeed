const webhoseio = require('webhoseio');

const client = webhoseio.config({
    token: 'f79c825d-f09a-491c-ad7b-2df462930f0d'
});

const makeQuery = function (keyowrd, type) {
    return {
        'q': ' "'+keyowrd+'" language:greek site_type:'+type+'',
        'sort': 'crawled'
    };
};

const params = (req) => {
    var query = req.url.split('?');
    var result = {};
    if (query.length >= 2) {
        query[1].split('&').forEach((item) => {
            try {
                result[item.split('=')[0]] = item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]] = '';
            }
        })
    }
    console.log('RESULT ' + result);
    return result;
};

module.exports.client = client;
module.exports.makeQuery = makeQuery;
module.exports.urlParams = params;