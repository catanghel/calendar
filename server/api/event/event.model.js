'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var date = new Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    min: 0,
    max: 11,
    required: true
  },
  day: {
    type: Number,
    min: 1,
    max: 31,
    required: true
  },
  hour: {
    type: Number,
    min: 0,
    max: 23,
    required: true
  },
  minute: {
    type: Number,
    min: 0,
    max: 60,
    required: true
  }
});

var CalendarEventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  calendar: {
    type: ObjectId,
    required: true
  },
  color: {
    type: String,
    default: 'NONE'
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  start: date,
  end: date
});

module.exports = CalendarEventSchema;
