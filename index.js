'use strict';

var util = require('util');
var fs = require('fs');

/**
 *
 * @param type {string}
 * @param attrsArr {array}
 * @returns {Array}
 */
function nonString(type, attrsArr) {

  var x;
  var newContent = [];

  for (x = 0; x < attrsArr.length; x++) {
    newContent.push({tag: type, attrs: attrsArr[x]});
    newContent.push('\n'); // ?
  }

  return newContent;
}

/**
 *
 * @param type {string}
 * @param content {array}
 * @returns {string[]}
 */
function nonArray(type, content) {
  return [
    {tag: type, content: [content]},
    '\n'
  ];
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
        return nonArray('title', objectData);
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

    },
    'default': function() {
      util.log('posthtml-head-elements: Please make sure the HTML head type is correct');
    }
  };

  if (type.indexOf('_') !== -1) {
    type = type.substr(0, type.indexOf('_'));
  }

  return (elementType[type]() || elementType['default']());
}

/**
 *
 * @param headElements {object}
 * @returns {Array.<T>}
 */
function buildNewTree(headElements) {

  var newHeadElements = [];

  Object.keys(headElements).forEach(function(value) {

    newHeadElements.push(findElmType(value, headElements[value]));

  });

  return Array.prototype.concat.apply([], newHeadElements);
}

module.exports = function(options) {

  options = options || {};
  options.headElementsTag = 'posthtml-head-elements';

  if (!options.headElements) {
    util.log('posthtml-head-elements: Don\'t forget to add a link to the JSON file containing the head elements to insert');
  }

  var jsonOne = JSON.parse(fs.readFileSync(options.headElements), 'utf8');

  return function posthtmlHeadElements(tree) {

    tree.match({tag: options.headElementsTag}, function() {
      return {
        tag: false, // delete this node, safe content
        content: buildNewTree(jsonOne)
      };
    });

    return tree;

  };

};