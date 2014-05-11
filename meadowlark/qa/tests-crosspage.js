var Browser = require('zombie');
var assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function(){

    setup(function(){
        bowser = new Browser();
    });

    test('requesting a group rate quote from hood river tour page should' + 'populate the hidden referrer field correctly', function(done){
        var referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });

    test('requesting a group rate quote from oregon coast tour page should' + 'populate the hidden referrer field correctly', function(done){
        var referrer = 'http://localhost:3000/tours/hood-river';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                assert(browser.field('referrer').value === referrer);
                done();
            });
        });
    });

    test('visiting the "request group rate" page directly should result' + 'in an empty value for the referrer', function(done){
        browser.visit('http://localhost3000/tours/request-group-rate', function(){
            assert(browser.field('referrer').value === '');
            done();
        });
    });



});
