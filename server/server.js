 'use strict';

 var express = require('express');
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var methodOverride = require('method-override');
 var _ = require('lodash');

// Setup server
var app = express();
var routes;
var server;
var io;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.models = require('./models');

routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});

// Connect to database
mongoose.connect('mongodb://localhost:27017/calendar');
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1); 
}
);

server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
	io.emit('message', 'plm');
});


// Start server
server.listen(3000, 'localhost', function () {
	console.log('Express server listening on %d, in %s mode', 3000, app.get('env'));
});

module.exports = app;
