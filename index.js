'use strict';

// own modules
const { httpsGet } = require('./get');
const { httpsAny } = require('./any');


// functions exposed for external use
module.exports = {
  httpsGet,
  httpsAny
};
