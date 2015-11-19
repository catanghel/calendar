'use strict';

describe('Service: CalendarRestangular', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var CalendarRestangular;
  beforeEach(inject(function (_CalendarRestangular_) {
    CalendarRestangular = _CalendarRestangular_;
  }));

  it('should do something', function () {
    expect(!!CalendarRestangular).toBe(true);
  });

});
