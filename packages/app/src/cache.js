'use strict';

const Configstore = require('configstore');
const config = new Configstore('epic-metal', {cache: null});

module.exports = {
  getCache,
  setCache,
};

function getCache() {
  return config.get('cache');
}

function setCache(value) {
  config.set('cache', value);
}
