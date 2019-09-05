import { configure } from '@storybook/react';

const req = require.context('../packages/frontend/src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
