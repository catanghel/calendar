'use strict';

var mongoose = require('mongoose');

var CalendarSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  color: {
  	type: String,
    default: ''
  }
});

module.exports = CalendarSchema;
