'use strict';
var fs = require('fs');
var path = require('path');
var posthtml = require('posthtml');
// var expect = require('chai').expect;
var posthtmlHeadElements = require('..');
// "test": "jscs {,*/}*.js && jshint {,*/}*.js && mocha test/test.js"
/**
 * @param file {string}
 * @returns {*}
 */
function absolutePath(file) {
  return path.join(__dirname, file);
}

var pageOne = fs.readFileSync(absolutePath('html/page_one.html'), 'utf8').toString();
var jsonOne = JSON.parse(fs.readFileSync(absolutePath('data/data_one.json'), 'utf8'));

/*Object.keys(jsonOne).forEach(function(key) {

 if (Array.isArray(jsonOne[key])) {
 console.log(key);
 console.dir(jsonOne[key]);
 }

 });*/

function test(input, done) {
  console.log('run test');
  posthtml()
    .use(posthtmlHeadElements({headElements: jsonOne}))
    .process(input, {sync: false})
    .then(function(result) {
      console.log('result');
      console.dir(result);
      // console.dir(result);
      // expect(output).to.eql(result.html);
      done();
    }).catch(function(error) {
    done(error);
  });
}

test(pageOne);