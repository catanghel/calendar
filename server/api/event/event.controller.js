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

  var rest = restful.model(
    'event',
    app.models.event
    ).methods(['get', 'put', 'post', 'delete']);
  rest.shouldUseAtomicUpdate = false;

  rest.after('put', function(req, res, next) {
    var locals = res.locals;
    console.log('Updated event: ' + locals.bundle._id);

    app.io.emit('event', req.body);

    next();
  });

  rest.after('post', function(req, res, next) {
    var locals = res.locals;
    console.log('Created Event: ' + locals.bundle._id);

    app.io.emit('event', req.body);

    next();
  });

  rest.after('delete', function(req, res, next) {
    var locals = res.locals;
    console.log('Deleted event.');

    app.io.emit('event', req.body);

    next();
  });

  rest.register(app, route);

  return function(req, res, next) {
    next();
  };
};
