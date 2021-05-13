const Paths = require('path');

const src = Paths.resolve(__dirname, 'src');

module.exports = {
    src: {
        path: src,
    },
    assets: {
        path: Paths.resolve(__dirname, 'assets'),
        file: 'index.html',
    },
    entry: {
        path: src,
        file: 'index.tsx',
    },
    output: {
        path: Paths.resolve(__dirname, 'build'),
    },
};
