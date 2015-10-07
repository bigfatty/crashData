/*eslint-env node */
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = require('./model/db'),
    blob = require('./model/blobs');

var routes = require('./routes/index'),
    blobs = require('./routes/blobs');
    
    
    
var CronJob = require('cron').CronJob;
new CronJob('00 30 11 * * 1-5', function() {
		var twoWeeksOld = new Date();
		twoWeeksOld.setHours(twoWeeksOld.getHours()-336);
		console.log("running cron");
		console.log("twoWeeksOld " + JSON.stringify(twoWeeksOld));
		
		mongoose.model('CrashCollection').find({date: {"$lt":twoWeeksOld}},function (err, out) {
			console.log("Less than two weeks old  data:" + JSON.stringify(out));
		    if (err) {
		        return;
		    }
		    });    
		    
		mongoose.model('CrashCollection').find({date: {"$lt":twoWeeksOld} }).remove().exec();	
}, function () {
    console.log("Cron complete:");
  },
  true);
	

//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', blobs);
app.use('/blobs', blobs);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
