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

var pageOne = fs.readFileSync(absolutePath('html/page_one.html'), 'utf8').toString();
var jsonOne = JSON.parse(fs.readFileSync(absolutePath('data/data_one.json'), 'utf8'));

function test(input, output, done) {
  posthtml()
    .use(posthtmlHeadElements({headElements: jsonOne}))
    .process(input)
    .then(function(result) {
      expect(output).to.eql(result.html);
      done();
    }).catch(function(error) {
    done(error);
  });
}


it('test', function(done) {
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
  test(input, output, done);
});
