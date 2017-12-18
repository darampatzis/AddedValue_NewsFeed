module.exports = {
    facebook: {
        clientID: '1863053447356182',
        clientSecret: '47feebff235bbf453b750080fe282e5a',
        callbackURL: 'https://public.it.teithe.gr/login/facebook/callback'
        //callbackURL: 'http://localhost:3000/login/facebook/callback'
    },
    itlogin: {
        clientID: '5a08952459a9dc3d6c987443',
        clientSecret: '52u7msyne982j0ogcvxw9gjunrsngrgtxkka4bmqf9owrp33iv',
        callbackURL: 'http://localhost:3000/login/login/callback',
        authUrl: 'https://login.it.teithe.gr/authorization',
        token: 'https://login.it.teithe.gr/token',
    },
    database: {
        url: 'mongodb://localhost:27017/news'
    },
    webhoseToken: {
        token: '68e6cd56-bbc0-4f64-8b69-0fdf619a6c99'
        // token: 'f79c825d-f09a-491c-ad7b-2df462930f0d' // 1000 requests left with this token
    }
};