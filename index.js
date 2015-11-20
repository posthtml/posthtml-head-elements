'use strict';

var util = require('util');

/**
 *
 * @param type {string}
 * @param content {array}
 * @returns {{}}
 */
function nonString(type, content) {

  var x;
  var newObject = {};

  for (x = 0; x < content.length; x++) {
    newObject[x] = {};
    newObject[x].tag = type;
    newObject[x].attrs = content[x];
  }

  return newObject;

}

/**
 *
 * @param type {string}
 * @param content {array}
 * @returns {{tag: *, content: *[]}}
 */
function nonArray(type, content) {
  return {
    tag: type,
    content: [content]
  };
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
        return nonArray(type, objectData);
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

/**
 *
 * @param headElements {object}
 * @returns {Array}
 */
function buildNewTree(headElements) {

  var newHeadElements = [];

  Object.keys(headElements).forEach(function(value) {

    newHeadElements.push(findElmType(value, headElements[value]));

  });

  return newHeadElements;

}

module.exports = function(options) {

  options = options || {};
  options.headElementsTag = 'posthtml-head-elements';

  if (!options.headElements) {
    util.log('posthtml-head-elements: Don\'t forget to add a link to the JSON file containing the head elements to insert');
  }

  return function posthtmlHeadElements(tree) {

    var newTree = buildNewTree(options.headElements);

    tree.match({tag: options.headElementsTag}, function(node) {

      node = {};

      Object.keys(newTree).forEach(function(value) {

        if (typeof newTree[value].tag !== 'undefined' && newTree[value].tag === 'title') {

          Object.assign(node, newTree[value]);

        } else {

          Object.getOwnPropertyNames(newTree[value]).forEach(function(val) {

            console.dir(newTree[value][val]);

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