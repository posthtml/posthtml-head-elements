'use strict';

var util = require('util');

function nonString(type, content) {

  var x;
  var newObject = {};

  for (x = 0; x < content.length; x++) {
    newObject[x] = {};
    newObject[x].tag = type;
    newObject[x].attrs = content[x];
  }

  Object.keys(newObject).map(function(value, key) {
    console.dir(newObject[value]);
    console.dir(key);
  });

  //console.dir(Object.keys(newObject).length);

  return newObject;

}

/**
 *
 * @param type {string}
 * @param objectData {object}
 * @returns {*}
 */
function findElmType(type, objectData) {
  var elementType = {
    'meta': function() {

      if (Array.isArray(objectData)) {
        return nonString(type, objectData);
      } else {
        util.log('posthtml-head-elements: Please use the correct syntax for a meta element');
      }
    },
    'title': function() {

      if (typeof objectData === 'string') {
        return {
          tag: 'title',
          content: [objectData]
        };
      } else {
        util.log('posthtml-head-elements: Please use the correct syntax for a title element');
      }

    },
    'link': function() {

      if (Array.isArray(objectData)) {
        return nonString(type, objectData);
      } else {
        util.log('posthtml-head-elements: Please use the correct syntax for a link element');
      }

    },
    'script': function() {

      if (Array.isArray(objectData)) {
        return nonString(type, objectData);
      } else {
        util.log('posthtml-head-elements: Please use the correct syntax for a script element');
      }

    },
    'base': function() {

      if (Array.isArray(objectData)) {
        return nonString(type, objectData);
      } else {
        util.log('posthtml-head-elements: Please use the correct syntax for a base element');
      }

    }
  };
  return elementType[type]();
}

function buildNewTree(headElements) {

  var newHeadElements = [];

  Object.keys(headElements).forEach(function(value) {

    newHeadElements.push(findElmType(value, headElements[value]));
    // newHeadElements.push('\n');

  });

  return newHeadElements;

}

module.exports = function(options) {

  options = options || {};
  options.headElementsTag = 'posthtml-head-elements';

  if (!options.headElements) {
    util.log('posthtml-head-elements: Don\'t forget to add a link to the JSON file containing the head elements to insert');
  }

  return function postHeadElements(tree) {

    var newTree = buildNewTree(options.headElements);

    tree.match({tag: options.headElementsTag}, function(node) {

      node = {};

      Object.keys(newTree).forEach(function(value) {

        if (typeof newTree[value].tag !== 'undefined' && newTree[value].tag === 'title') {
          Object.assign(node, newTree[value]);
        } else {

          console.log('here');
          console.dir(newTree[value]);

          Object.keys(newTree[value]).map(function(key) {
            // console.dir(newTree[value][key]);
          });

        }

      });

      return node;
    });

    tree.walk(function(node) {

      if (node.tag === 'head') {
        //console.dir(node.content);
      }

      return node;
    });

    return tree;

  };

};