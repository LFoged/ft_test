'use strict';

// node modules
const { request } = require('https');
// own modules
const {
  validation: { isNonEmptyArray },
  request: { promiseAnyRequest }
} = require('../_common');


// default error message to send for TypeErrors
const _errorMsg = 'Expected Array of Objects, with "method" and "url" props';


// make an HTTPS request using any method
// @Accepts: Object - example: 
// { 
//   method: String (required), 
//   url: String (required), 
//   payload: Object (optional),
//   headers: Object (optional),
//   isJSON: Boolean (optional)
// }
// @Returns: Promise => Object - example: 
// { 
//   statusCode: Number (response statusCode), 
//   statusMessage: String (response statusMessage), 
//   headers: Object (response headers),
//   payload: String or Object (if 'isJSON' is true)
// }
const _makeAnyRequest = async ({
  method = '',
  url = '',
  payload = {},
  headers = {},
  isJSON = true
}) => {
  try {
    if (!method || !url) {
      throw new TypeError(_errorMsg);
    }
    // uppercase method for use in 'promiseAnyRequest' function below
    method = method.toUpperCase();

    if (isJSON) {
      headers['Content-Type'] = 'application/json';
      payload = JSON.stringify(payload);
    }

    const response = await promiseAnyRequest({ method, url, payload, headers });
    if (isJSON) {
      response.payload = JSON.parse(response.payload);
    }

    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

// process Array of HTTPS requests using any method
// @Accepts: Array of Objects
// @Returns: Promise => Array of responses 
module.exports = (reqObjArray = [{}]) => {
  if (!isNonEmptyArray(reqObjArray)) {
    return Promise.reject(new TypeError(_errorMsg));
  }

  return Promise.all(reqObjArray.map(_makeAnyRequest));
};
