/**
 * GET     /events              ->  list
 * POST    /events              ->  create
 * GET     /events/:id          ->  view
 * PUT     /events/:id          ->  update
 * DELETE  /events/:id          ->  delete
 */
 'use strict';

var restful = require('node-restful');

module.exports = function(app, route) {

  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  var rest = restful.model(
    'event',
    app.models.event
  ).methods(['get', 'put', 'post', 'delete']);

  rest.after('put', function(req, res, next) {
    var locals = res.locals;
    console.log('Updated event: ' + locals.bundle._id);

    io.emit('event:update', req.body);

    next();
  });

  rest.after('post', function(req, res, next) {
    var locals = res.locals;
    console.log('Created Event: ' + locals.bundle._id);

    io.emit('event:create', req.body);

    next();
  });

  rest.after('delete', function(req, res, next) {
    var locals = res.locals;
    console.log('Deleted event.');

    io.emit('event:delete', req.body);

    next();
  });

  rest.register(app, route);

  return function(req, res, next) {
    next();
  };
};
