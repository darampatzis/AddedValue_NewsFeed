const webhoseio = require('webhoseio');
const config = require('./config');

const client = webhoseio.config({
    token: config.webhoseToken.token
});

const makeQuery = (keyword, type) => {
    // Αποκλεισμός μερικών ιστοσελίδων απο τα αποτελέσματα
    return {
        'q': '(' + keyword + ') language:greek site_type:' + type + ' -site:kerkida.net -site:parapolitika.gr' +
        ' -site:mykosmos.gr -site:escortsmovies.gr -site:teokanistras.gr -site:presshub.gr -site:cosmosjobs.com',
        'sort': 'crawled',
        'size': 10
    };
};

module.exports.client = client;
module.exports.makeQuery = makeQuery;
