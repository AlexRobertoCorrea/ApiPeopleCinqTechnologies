/**
 * Created by alex on 26/04/16.
 */
'use strict';

describe('Service: PersonService', function () {
	var PersonService;

	// load the service's module
	beforeEach(module('api-people-cinqtechnologies'));

	beforeEach(inject(function (_PersonService_) {
        PersonService = _PersonService_;
	}));

	it('should do something', function () {
		expect(!!PersonService).toBe(true);
	});

});
