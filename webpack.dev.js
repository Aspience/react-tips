const { merge } = require('webpack-merge');

const NODE_ENV = 'development';

module.exports = (env) => {
    const commonConfig = require('./webpack.common.js')(NODE_ENV, env);

    return merge(commonConfig, {
        devServer: {
            host: 'localhost',
            port: 3030,
            historyApiFallback: true,
            open: true,
        },
    });
};
