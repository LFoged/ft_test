'use strict';

// node modules
const { get, request } = require('https');


// send HTTPS GET request
// @Accepts: String (url) 
// @Returns: Promise => String (response buffer concatenated string)
exports.promiseGetRequest = (url = '') => {
  return new Promise((resolve, reject) => {
    const req = get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', (error) => reject(error));
    });
    req.on('error', (error) => reject(error));
    req.end();
  });
};


// send HTTPS request using any method
// @Accepts: Object - example: 
// { 
//   method: String (required), 
//   url: String (required), 
//   payload: Object (optional),
//   headers: Object (optional)
// }
// @Returns: Promise => Object - example: 
// { 
//   statusCode: Number (response statusCode), 
//   statusMessage: String (response statusMessage), 
//   headers: Object (response headers),
//   payload: String (response buffer concatenated string)
// }
exports.promiseAnyRequest = ({
  method = '',
  url = '',
  payload = {},
  headers = {}
}) => {
  return new Promise((resolve, reject) => {
    const req = request(url, { method, headers }, async (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const resData = {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          payload: data
        };

        return resolve(resData)
      });
      res.on('error', (error) => reject(error));
    });

    req.on('error', (error) => reject(error));

    if (method !== 'GET') {
      req.write(payload);
    }

    req.end();
  });
};
