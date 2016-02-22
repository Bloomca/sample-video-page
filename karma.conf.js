'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        'frameworks': [
            'mocha',
            'sinon-chai',
            'chai',
            'sinon'
        ],
        captureTimeout: 25000,
        'browsers': ['PhantomJS'],
        'files': [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'node_modules/whatwg-fetch/fetch.js',
            'src/scripts/**/*-test.js'
        ],
        'preprocessors': {
            'src/scripts/**/*-test.js': ['webpack']
        },
        'webpackMiddleware': {'noInfo': true},
        'reporters': [
            'mocha',
            'coverage',
            'notify'
        ],
        'plugins': [
            'karma-webpack',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-chai',
            'karma-sinon',
            'karma-phantomjs-launcher',
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-notify-reporter'
        ],
        'coverageReporter': {
            dir: 'coverage/',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'}
            ]
        },
        'webpack': {
            entry: {
                client: './src/scripts/index.js'
            },
            output: {
                path: './build',
                publicPath: 'http://localhost:8080/',
                filename: '[name].js'
            },
            resolve: {
                extensions: ['', '.js'],
                modulesDirectories: ['web_modules', 'node_modules', 'scripts']
            },
            module: {
                'preLoaders': [
                    {
                        'test': /\.js$/,
                        'exclude': /(__tests__|node_modules)/,
                        'loader': 'isparta-instrumenter-loader'
                    }
                ],
                loaders: [
                    { test: /\.json$/, loader: "json-loader" },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel'
                    },
                    {
                      test: /\.css$/,
                      loader: 'style-loader!css-loader!postcss-loader'
                    },
                    {
                        test: /\.sass/,
                        loader: 'style-loader!css-loader!sass-loader?indentedSyntax'
                    },
                    {
                      test: /\.(png|svg|jpe?g|gif)$/,
                      loader: 'url-loader?limit=1000&name=public/assets/[name].[sha512:hash:base64:7].[ext]'
                    },
                    {
                      test: /\.(eot|ttf|woff|woff2)$/,
                      loader: 'file-loader?name=public/assets/[name].[sha512:hash:base64:7].[ext]'
                    },
                    {
                        test: /\.(jpe?g$|gif|png)$/,
                        loader: 'file-loader?name=images/[hash].[ext]'
                    }, {
                        test: /\.html/,
                        loader: 'html'
                    }, {
                        test: /\.svg/,
                        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=../build/public/images/[hash].[ext]'
                    }
                ]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': '"development"',
                    '__DEV__': true,
                    '__API__': '"http://localhost"',
                    '__ENV__': '"local"'
                })
            ]
        },

        //sometime firefox runs very slow - it can takes 20-30 seconds
        //so set this parameter to 100 seconds
        browserNoActivityTimeout: 100000
    });
};
