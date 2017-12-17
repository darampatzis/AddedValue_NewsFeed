const webhoseio = require('webhoseio');
const config = require('./config');

const client = webhoseio.config({
    token: config.webhoseToken.token
});

const makeQuery = (keyword, type) => {
    return {
        'q': '(' + keyword + ') language:greek site_type:' + type + ' -site:kerkida.net -site:parapolitika.gr' +
        ' -site:mykosmos.gr -site:escortsmovies.gr -site:teokanistras.gr -site:presshub.gr -site:cosmosjobs.com',
        //δουλεύει 'q': keyword + ' language:greek site_type:' + type,
        'sort': 'crawled',
        'size': 10
    };
};

module.exports.client = client;
module.exports.makeQuery = makeQuery;