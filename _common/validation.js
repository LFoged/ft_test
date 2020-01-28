'use strict';

// check that parameter is a non-empty Array
// @Accepts: Array 
// @Returns: Boolean
exports.isNonEmptyArray = (array = []) => {
  return (typeof array === 'object' && array.length > 0);
};


// check that parameter is a non-empty String
// @Accepts: String 
// @Returns: Boolean
exports.isNonEmptyString = (string = '') => {
  return (typeof string === 'string' && string.length > 0);
};
