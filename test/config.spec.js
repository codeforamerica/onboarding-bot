var assert = require('chai').assert;
var config = require('../config.json');

describe('Config', function() {

	it('should have a valid token', function() {
    assert.match(config.authentication.token, /^[0-9A-Za-z]/, 'RegEx passes 👏');
	});

});
