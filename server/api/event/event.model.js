'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
    defaut: ''
  },
  isAllDay: {
    type: Boolean
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  }
});

module.exports = CalendarEventSchema;
