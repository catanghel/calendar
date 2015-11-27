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
    default: 'NONE'
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  start: {
    type: Number,
    required: false
  },
  end: {
    type: Number,
    required: false
  }
});

module.exports = CalendarEventSchema;
