'use strict';

// node modules
const { request } = require('https');


const _requestAny = ({
  method = '',
  url = '',
  payload = {},
  headers = {},
  isJSON = true
}) => {
  return new Promise((resolve, reject) => {
    method = method.toUpperCase();
    if (isJSON) {
      headers['Content-Type'] = 'application/json';
    }

    const req = request(url, { method, headers }, async (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const payload = isJSON ? JSON.parse(data) : data;
        const { statusCode, statusMessage, headers } = res;
        const resData = { statusCode, statusMessage, headers, payload };

        return resolve(resData)
      });
      res.on('error', (error) => reject(error));
    });
    req.on('error', (error) => reject(error));

    if (method !== 'GET') {
      const requestPayload = isJSON ? JSON.stringify(payload) : payload;
      req.write(requestPayload);
    }

    req.end();
  });
};


module.exports = (reqObjArray = []) => {
  return Promise.all(reqObjArray.map(_requestAny));
};
