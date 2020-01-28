'use strict';

// node modules
const { get } = require('https');
// own modules
const {
  validation: { isNonEmptyArray, isNonEmptyString },
  request: { promiseGetRequest }
} = require('../_common');


// default error message to send for TypeErrors
const _errMsg = 'Expected an Array of URL Strings';


// make an HTTPS request using GET method
// @Accepts: String
// @Returns: Promise => JSON parsed Array/Object
const _makeGetRequest = async (url = '') => {
  try {
    if (!isNonEmptyString(url)) {
      throw new TypeError(_errMsg);
    }

    let response = await promiseGetRequest(url);
    response = JSON.parse(response);

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

// process Array of HTTPS requests using GET method
// @Accepts: Array of Strings
// @Returns: Promise => Array of (JSON parsed) responses
module.exports = (urlsArray = ['']) => {
  if (!isNonEmptyArray(urlsArray)) {
    return Promise.reject(new TypeError(_errMsg));
  };

  return Promise.all(urlsArray.map(_makeGetRequest));
};
