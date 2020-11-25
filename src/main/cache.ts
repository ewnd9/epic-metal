'use strict';

import Configstore from 'configstore';
export const config = new Configstore('epic-metal', { cache: null });

export function getCache() {
  return config.get('cache');
}

export function setCache(value) {
  config.set('cache', value);
}
