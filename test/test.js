'use strict';
var fs = require('fs');
var path = require('path');
var posthtml = require('posthtml');
// var expect = require('chai').expect;
var posthtmlHeadElements = require('..');
var _ = require('lodash');
// "test": "jscs {,*/}*.js && jshint {,*/}*.js && mocha test/test.js"
/**
 *
 * @param file {string}
 * @returns {*}
 */
function absolutePath(file) {
  return path.join(__dirname, file);
}

/**
 *
 * @param type {string}
 * @returns {*}
 */
function findElmType(type) {
  var elementType = {
    'meta': function() {
      console.log('meta');
    },
    'title': function() {
      console.log('title');
    },
    'link': function() {
      console.log('link');
    },
    'script': function() {
      console.log('script');
    },
    'base': function() {
      console.log('base');
    }
  };
  return elementType[type]();
}

var pageOne = fs.readFileSync(absolutePath('html/page_one.html'), 'utf8');
var jsonOne = JSON.parse(fs.readFileSync(absolutePath('data/data_one.json'), 'utf8'));

Object.keys(jsonOne).forEach(function(key, value) {

  if (Array.isArray(jsonOne[key])) {

    console.log(key);
    console.dir(jsonOne[key]);

  }

});

/*fs.readFile(absolutePath('data/data_one.json'), 'utf8', function(err, data) {

 if (err) {
 throw err;
 }

 console.log('break');

 console.dir(data);

 });*/

/*

 var elementType = {
 'meta': function() {
 console.log('meta');
 _.chain(jsonOne[key]).forEach(function(n, i) {

 console.dir(n);

 for (var prop in n) {

 console.dir(Object.keys(n)[0] + '|' + Object.keys(n)[1]);
 console.dir(n[prop]);

 }

 }).value();
 },
 'title': function() {
 console.log('title');
 console.dir(jsonOne[key]);
 },
 'link': function() {
 console.log('link');
 console.dir(jsonOne[key]);
 },
 'script': function() {
 console.log('script');
 console.dir(jsonOne[key]);
 },
 'base': function() {
 console.log('base');
 console.dir(jsonOne[key]);
 }
 };

 elementType(key);
 */

function test(input, done) {
  posthtml()
    .use(posthtmlHeadElements())
    .process(input)
    .then(function() {
      // console.dir(result);
      // expect(output).to.eql(result.html);
      done();
    }).catch(function(error) {
    done(error);
  });
}

test(pageOne);