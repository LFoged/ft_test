'use strict';

// node modules
const { get } = require('https');


// @accepts: String
// @returns: <Promise> => [results] (results are JSON parsed)
const _requestGet = (url = '') => {
  return new Promise((resolve, reject) => {
    const req = get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', (error) => reject(error));
    });
    req.on('error', (error) => reject(error));
    req.end();
  });
};

// @accepts: [String]
// @returns: <Promise> => [results] (results are JSON parsed)
module.exports = (urlsArray = ['']) => {
  return Promise.all(urlsArray.map(_requestGet));
};
