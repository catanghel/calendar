'use strict';

var should = require('should');
var app = require('../../server');
var request = require('supertest');

var eventId;

var eventObject = {
  'isAllDay': false,
  'calendar': '565eaa5979695c50014ff318',
  'start': 1448953200000,
  'end': 1448956800000,
  'title': 'test event',
  'color': '#f0ad4e'
};
var editEventObject = {
  'isAllDay': false,
  'calendar': '565eaa5979695c50014ff318',
  'start': 1448953200000,
  'end': 1448956800000,
  'title': 'modified event',
  'color': '#f0ad4e'
};

describe('/api/events', function() {

  // list
  it('should list the events as JSON array', function(done) {
    request(app)
    .get('/api/events')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      done();
    });
  });

  // create
  it('should create an event', function(done) {
    request(app)
    .post('/api/events')
    .send(eventObject)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('_id');
      res.body.title.should.equal('test event');
      eventId = res.body._id;
      done();
    });
  });

  // update
  it('should modify an event', function(done) {
    request(app)
    .put('/api/events/' + eventId)
    .send(editEventObject)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('_id');
      res.body.title.should.equal('modified event');
      done();
    });
  });

  // delete
  it('should delete an event', function(done) {
    request(app)
    .delete('/api/events/' + eventId)
    .expect(204)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  // get by id
  it('should return 404 for an event that does not exist', function(done) {
    request(app)
    .get('/api/events/' + eventId)
    .expect(404)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});
