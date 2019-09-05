'use strict';

const carlo = require('carlo');
const execa = require('execa');
const config = require('../../../config.json');
const {getJira} = require('./api');

(async () => {
  const app = await carlo.launch();
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);

  await app.exposeFunction('env', async () => {
    const {result} = await getJira();

    return {
      result,
      config,
    };
  });

  await app.exposeFunction('openInSystemBrowser', async url => {
    console.log(url);
    execa('xdg-open', [url]);
  });

  await app.load('http://localhost:3000');
})();
