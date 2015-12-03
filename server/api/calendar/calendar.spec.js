'use strict';

var should = require('should');
var app = require('../../server');
var request = require('supertest');

var calendarId;

var calendarObject = {
  'title': 'Test calendar',
  'description': 'test',
  'color': '#ff8040'
};

var editCalendarObject = {
  'title': 'Modified calendar',
  'description': 'test',
  'color': '#ff8040'
};

describe('/api/calendars', function() {

  // list
  it('should list the calendars list respond with JSON array', function(done) {
    request(app)
    .get('/api/calendars')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      done();
    });
  });

  // create
  it('should create a calendar', function(done) {
    request(app)
    .post('/api/calendars')
    .send(calendarObject)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('_id');
      res.body.title.should.equal('Test calendar');
      calendarId = res.body._id;
      done();
    });
  });

  // update
  it('should update a calendar', function(done) {
    request(app)
    .put('/api/calendars/' + calendarId)
    .send(editCalendarObject)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('_id');
      res.body.title.should.equal('Modified calendar');
      done();
    });
  });

  // delete
  it('should delete a calendar', function(done) {
    request(app)
    .delete('/api/calendars/' + calendarId)
    .expect(204)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });

  // get by id
  it('should return 404 for a calendar that does not exist', function(done) {
    request(app)
    .get('/api/calendars/' + calendarId)
    .expect(404)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});
