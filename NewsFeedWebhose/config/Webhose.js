const webhoseio = require('webhoseio');

const client = webhoseio.config({
    token: 'f79c825d-f09a-491c-ad7b-2df462930f0d'
});

const default_query_params = {
    'q': ' "News" language:greek site_type:news -site:kerkida.net',
    // kerkida.net Xalia arthra kai apeikonisi ara blacklist
    'sort': 'crawled'
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
module.exports.defaultParams = default_query_params;
module.exports.urlParams = params;