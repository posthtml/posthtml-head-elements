'use strict';
var fs = require('fs');
var path = require('path');
var posthtml = require('posthtml');
var expect = require('chai').expect;
var posthtmlHeadElements = require('..');
// "test": "jscs {,*/}*.js && jshint {,*/}*.js && mocha test/test.js"

/**
 * @param file {string}
 * @returns {*}
 */
function absolutePath(file) {
  return path.join(__dirname, file);
}

var jsonOne = JSON.parse(fs.readFileSync(absolutePath('data/data_one.json'), 'utf8'));
var pageTwo = fs.readFileSync(absolutePath('html/page_two.html'), 'utf8').toString();
var pageTwoResult = fs.readFileSync(absolutePath('html/page_two_result.html'), 'utf8').toString();
var jsonTwo = JSON.parse(fs.readFileSync(absolutePath('data/data_two.json'), 'utf8'));
var pageThree = fs.readFileSync(absolutePath('html/page_three.html'), 'utf8').toString();
var pageThreeResult = fs.readFileSync(absolutePath('html/page_three_result.html'), 'utf8').toString();

function testOne(input, output, jsonFile, done) {
  posthtml()
    .use(posthtmlHeadElements({headElements: jsonFile}))
    .process(input)
    .then(function(result) {
      expect(output).to.eql(result.html);
      done();
    }).catch(function(error) {
    done(error);
  });
}

function testTwo(input, output, jsonFile, done) {
  posthtml()
    .use(posthtmlHeadElements({headElements: jsonFile}))
    .process(input)
    .then(function(result) {

      expect(result.html).to.have.string('<meta charset="utf-8">');
      expect(result.html).to.have.string('<title>Web Starter Kit</title>');
      expect(result.html).to.have.string('<link rel="manifest" href="manifest.json">');
      expect(result.html).to.have.string('<meta name="mobile-web-app-capable" content="yes">');
      expect(result.html).to.have.string('<link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">');
      expect(result.html).to.have.string('<meta name="msapplication-TileImage" content="mages/touch/ms-touch-icon-144x144-precomposed.png">');
      expect(result.html).to.have.string('<link rel="stylesheet" href="styles/main.css">');

      done();
    }).catch(function(error) {
    done(error);
  });
}

function testThree(input, output, jsonFile, done) {
  posthtml()
    .use(posthtmlHeadElements({headElements: jsonFile}))
    .process(input)
    .then(function(result) {

      expect(result.html).to.not.have.string('<meta charset="utf-8">');
      expect(result.html).to.not.have.string('<title>Web Starter Kit</title>');
      expect(result.html).to.not.have.string('<link rel="manifest" href="manifest.json">');
      expect(result.html).to.not.have.string('<meta name="mobile-web-app-capable" content="yes">');
      expect(result.html).to.not.have.string('<link rel="apple-touch-icon" href="images/touch/apple-touch-icon.png">');
      expect(result.html).to.not.have.string('<meta name="msapplication-TileImage" content="mages/touch/ms-touch-icon-144x144-precomposed.png">');
      expect(result.html).to.not.have.string('<link rel="stylesheet" href="styles/main.css">');

      done();
    }).catch(function(error) {
    done(error);
  });
}

it('Test one: basic search and replace', function(done) {
  var input = '<posthtml-head-elements></posthtml-head-elements>';
  var output = [
    '<meta charset="utf-8">',
    '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
    '<meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>Web Starter Kit</title>',
    '<link rel="manifest" href="manifest.json">',
    '<link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">',
    '<script src="//cdn.polyfill.io/v1/polyfill.min.js"></script>',
    '<base href="/">'
  ].join('\n');
  output = output + '\n';
  testOne(input, output, jsonOne, done);
});

it('Test two: complete search and replace', function(done) {
  testTwo(pageTwo, pageTwoResult, jsonTwo, done);
});

it('Test three: failed search and replace. HTML head document does not contain custom element, <posthtml-head-elements>', function(done) {
  testThree(pageThree, pageThreeResult, jsonTwo, done);
});

