'use strict';

module.exports = function postHeadElements() {

  // var headOptions = options || {};

  return function(tree) {

    console.log('here it is');

    return tree.match({tag: 'head'}, function(node) {

      console.dir(node);

      return node;
    });
  };
};