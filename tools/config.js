const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// passed options
const yargs = require('yargs').argv;

const WATCH = global.watch;
const DEBUG = yargs.env !== 'prod';

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 9',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

const babelLoader = Object.assign({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
});

const COMMON_LOADERS = [
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.scss$/,
    loader: DEBUG
      ? 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
      : ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?indentedSyntax')
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
    test: /\.html$/,
    loader: 'html'
  },
  babelLoader
];

const resolve = {
  extensions: ['', '.js', '.sass'],
  modulesDirectories: ['scripts', 'node_modules']
};

module.exports = {
  entry: [].concat(WATCH ? [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server'
  ] : [], ['./src/scripts/index.js']),
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'public/client.[hash].js'
  },
  resolve,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      'process.env.BABEL_ENV': WATCH ? '"watch"' : '"production"',
      '__DEV__': DEBUG,
      '__SERVER__': false
    }),
    new HtmlWebpackPlugin({
      title: 'Video page',
      template: 'src/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ].concat(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin('public/styles/styles.[hash].css')
    ], WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : []),
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint'
    //   }
    // ],

    loaders: COMMON_LOADERS
  },
  postcss: [
    autoprefixer(AUTOPREFIXER_BROWSERS)
  ],
  stats: {
    colors: true,
    reasons: DEBUG,
    timings: true
  }
};
