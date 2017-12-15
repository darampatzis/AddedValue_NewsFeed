module.exports = {
    facebook: {
        clientID: '1863053447356182',
        clientSecret: '47feebff235bbf453b750080fe282e5a',
        callbackURL: 'http://localhost:3000/login/facebook/callback'
    },
    itlogin: {
        clientID: '5a08952459a9dc3d6c987443',
        clientSecret: '52u7msyne982j0ogcvxw9gjunrsngrgtxkka4bmqf9owrp33iv',
        callbackURL: 'http://localhost:3000/login/login/callback',
        authUrl: 'https://login.it.teithe.gr/authorization',
        token: 'https://login.it.teithe.gr/token',
    },
    database: {
        url: 'mongodb://userVEI:wlPEjiLvx7Ex7ecJ@mongodb.teinews.svc:27017/news'
    },
    webhoseToken: {
        token: '68e6cd56-bbc0-4f64-8b69-0fdf619a6c99a'
    }
};