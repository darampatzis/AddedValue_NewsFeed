const webhoseio = require('webhoseio');
const config = require('./config');

const client = webhoseio.config({
    token: config.webhoseToken.token
});

const makeQuery = function (keyword, type) {
    return {
        'q': ' "' + keyword + '" language:greek site_type:' + type + '',
        'sort': 'crawled',
        'size': 10
    };
};

const params = (req) => {
        let query = req.url.split('?');
        let result = {};
        if (query.length >= 2) {
            query[1].split('&').forEach((item) => {
                try {
                    result[item.split('=')[0]] = item.split('=')[1];
                } catch
                    (e) {
                    result[item.split('=')[0]] = '';
                }
            })
        }
        console.log('RESULT ' + result);
        return result;
    }
;

module.exports.client = client;
module.exports.makeQuery = makeQuery;
module.exports.urlParams = params;