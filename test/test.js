'use strict';
var fs = require('fs');
var path = require('path');
var posthtml = require('posthtml');
// var expect = require('chai').expect;
var posthtmlHeadElements = require('..');
var _ = require('lodash');

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
      return 'meta';
    },
    'title': function() {
      return 'title';
    },
    'link': function() {
      return 'link';
    },
    'script': function() {
      return 'script';
    },
    'base': function() {
      return 'base';
    }
  };
  return elementType[type]();
}

var pageOne = fs.readFileSync(absolutePath('html/page_one.html'), 'utf8');
var jsonOne = JSON.parse(fs.readFileSync(absolutePath('data/data_one.json'), 'utf8'));

Object.keys(jsonOne).forEach(function(key, value) {

  var elementType = {
    'meta': function() {
      console.log('meta');
      /*  var reformattedArray = jsonOne[key].map(function(obj, index) {
       console.dir(obj);
       // console.dir(jsonOne[key][index]);
       });*/
      _.chain(jsonOne[key]).forEach(function(n, i) {

        console.dir(n);

        for (var prop in n) {

          console.dir(Object.keys(n)[0] + '|' + Object.keys(n)[1]);
          console.dir(n[prop]);

/*          console.log(i);
          console.log(Object.keys(n)[i]);*/

       /*   if (!Object.keys(n)[1]) {
            console.log(Object.keys(n)[0]);
          } else {
            console.log(Object.keys(n)[1]);
          }
          console.log(n[prop]);*/

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

  elementType[key]();

});

function test(input, done) {
  posthtml()
    .use(posthtmlHeadElements())
    .process(input)
    .then(function() {
      //console.dir(result);
      // expect(output).to.eql(result.html);
      done();
    }).catch(function(error) {
    done(error);
  });
}

test(pageOne);

/*function pluginProcess(attrsTree, html) {
 return posthtml()
 .use(attrsTree)
 .process(html)
 .then(function(result) {
 return result.html;
 });
 }

 describe('posthtml-head-elements', function() {

 it('It should work', function() {

 return pluginProcess(posthtmlHeadElements, pageOne)
 .then(function(html) {
 console.dir(html);
 });
 });

 });*/
