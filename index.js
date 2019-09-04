'use strict';

const carlo = require('carlo');
const {getJira} = require('./api');

(async () => {
  const app = await carlo.launch();
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);

  await app.exposeFunction('env', async () => {
    return getJira();
  });

  await app.load('index.html');
})();
