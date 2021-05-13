const Path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = (NODE_ENV, env) => {
    const isProd = NODE_ENV === 'production';

    return {
        mode: NODE_ENV,
        entry: Path.join(paths.entry.path, paths.entry.file),
        output: {
            publicPath: '/',
            path: paths.entry.output,
            filename: '[hash].js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            plugins: [new TsconfigPathsPlugin()],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    loader: 'babel-loader',
                    include: paths.src.path,
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                async: true,
            }),
            new HtmlWebPackPlugin({
                template: Path.join(paths.assets.path, paths.assets.file),
                filename: paths.assets.file,
                minify: isProd
                    ? {
                          removeComments: true,
                          collapseWhitespace: true,
                          removeRedundantAttributes: true,
                          useShortDoctype: true,
                          removeEmptyAttributes: true,
                          removeStyleLinkTypeAttributes: true,
                          removeScriptTypeAttributes: true,
                      }
                    : false,
            }),
        ],
    };
};
