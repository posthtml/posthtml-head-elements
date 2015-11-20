'use strict';

var util = require('util');
var render = require('posthtml-render');

function nonString(type, content) {

  var x;
  var newObject = '';

  for (x = 0; x < content.length; x++) {
    newObject += render({tag: type, attrs: content[x]});
    newObject += '\n';
  }

  return newObject;

}

function nonArray(type, content) {
  return render({tag: type, content: [content]});
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

      var newHTML = '';
      var x;

      for (x = 0; x < newTree.length; x++) {
        newHTML += newTree[x];
      }

      node = newHTML;

      return node;
    });

    /* tree.walk(function(node) {

     if (node.tag === 'head') {
     console.dir(node.content);
     }

     return node;
     });*/

    return tree;

  };

};