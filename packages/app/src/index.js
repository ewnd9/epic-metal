'use strict';

const carlo = require('carlo');
const execa = require('execa');
const path = require('path');
const config = require('../../../config.json');
const {getJira} = require('./api');
const isProd = process.env.NODE_ENV === 'production';
const frontendBuildFolder = path.resolve(`${__dirname}/../../frontend/build`);
const {getCache, setCache} = require('./cache');

(async () => {
  const app = await carlo.launch();
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);

  await app.exposeFunction('env', async () => {
    const result = getCache();

    setTimeout(async () => {
      const {result} = await getJira();
      setCache(result);

      app.evaluate(async result => {
        window.__setValueFromBackend(result);
      }, result);
    });

    return {
      result,
      config,
    };
  });

  await app.exposeFunction('openInSystemBrowser', async url => {
    execa('xdg-open', [url]);
  });

  if (isProd) {
    app.serveFolder(frontendBuildFolder);
    await app.load('index.html');
  } else {
    await app.load('http://localhost:3000');
  }
})();
