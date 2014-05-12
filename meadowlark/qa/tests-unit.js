var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune Cookie tests', function(){
	test('getFortune() shoud return a fortune', function(){
		expect(fortune.getFortune()).to.be.a('string');
	});

});