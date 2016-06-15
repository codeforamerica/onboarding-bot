var assert = require('chai').assert;
var config = require('../config.json');
var controller = require('../bot/index');

describe('Messsaging', function() {

	before(function() {
		controller.spawn(config.authentication).startRTM();
	});

	it('should say hi when you say hi', function() {
    // TODO: figure out way to best way to test bot,
    // perhaps spin up server and use that to make requests to bot here
	});

});
