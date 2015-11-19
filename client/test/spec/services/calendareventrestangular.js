'use strict';

describe('Service: CalendarEventRestangular', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var CalendarEventRestangular;
  beforeEach(inject(function (_CalendarEventRestangular_) {
    CalendarEventRestangular = _CalendarEventRestangular_;
  }));

  it('should do something', function () {
    expect(!!CalendarEventRestangular).toBe(true);
  });

});
