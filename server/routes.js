/**
 * Main application routes
 */
'use strict';

module.exports = {
  '/api/calendars': require('./api/calendar/calendar.controller'),
  '/api/events': require('./api/event/event.controller')
}
