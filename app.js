const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const config = require('./config/config').database.url;
mongoose.Promise = global.Promise;

mongoose.connect(config, {
    server: {
        socketOptions: {
            socketTimeoutMS: 120000, //120000 = 2minutes
            connectionTimeout: 120000
        }
    }
});

const index = require('./routes/index');

const app = express();

require('./config/database');
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.locals.moment.locale('el');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'SDAsad7a844tcJm49glsdgak89treR5#Dsd',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 60 * 60 // = 1 hours.
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

require('./routes/login')(app, passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
