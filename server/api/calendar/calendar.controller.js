/**
 * GET     /calendars              ->  list
 * POST    /calendars              ->  create
 * GET     /calendars/:id          ->  view
 * PUT     /calendars/:id          ->  update
 * DELETE  /calendars/:id          ->  delete
 */
 'use strict';

var restful = require('node-restful');

module.exports = function(app, route) {

  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  var rest = restful.model(
    'calendar',
    app.models.calendar
  ).methods(['get', 'put', 'post', 'delete']);

  rest.after('put', function(req, res, next) {
    var locals = res.locals;
    console.log('Updated calendar: ' + locals.bundle._id);

    io.emit('calendar:update', req.body);

    next();
  });

  rest.after('post', function(req, res, next) {
    var locals = res.locals;
    console.log('Created calendar: ' + locals.bundle._id);

    io.emit('calendar:create', req.body);

    next();
  });

  rest.after('delete', function(req, res, next) {
    var locals = res.locals;
    console.log('Calendar deleted.');

    io.emit('calendar:delete', req.body);

    next();
  });

  rest.register(app, route);

  return function(req, res, next) {
    next();
  };
};
