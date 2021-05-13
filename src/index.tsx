import React from 'react';
import { render } from 'react-dom';

import { App } from './app';

const root = document.querySelector('#app-root');
if (root) {
    render(<App />, root);
}
