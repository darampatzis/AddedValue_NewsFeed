const webhoseio = require('../../config/Webhose');
const osLocale = require('os-locale');
var os_locale;

osLocale().then(locale => {
    os_locale = locale.replace('[^A-Z]/g', '');
});

function searchParams(query, sort, site_type, lang, country) {
    var params = {
        'q': ' "' + query + '" language:' + lang + ' site_type:"' + site_type + '" thread.country:' + country + '',
        'sort': sort
    };
}

module.exports = {
    searchNews: (params) => {
        webhoseio.client.query('filterWebContent', searchParams('Donald', 'crawled', 'news', os_locale, 'GR'))
            .then(output => {

            })
    }
};