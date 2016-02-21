global.watch = true;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config');

const server = new WebpackDevServer(webpack(config), {
  contentBase: "../build",
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  }
});

server.listen(3001, '0.0.0.0', function(err) {
  if (err) console.log(err);
  console.log('Listening at localhost:3001...');
});
