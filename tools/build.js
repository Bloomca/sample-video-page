const webpack = require('webpack');
const config = require('./config');
const ncp = require('ncp');
const del = require('del');
const mkdirp = require('mkdirp');

function copy(target, destination) {
  return new Promise((resolve, reject) => {
    ncp(target, destination, err => {
      if (err) {
        console.log('error during copy', err);
        reject();
      } else {
        resolve();
      }
    });
  });
}

mkdirp('build', () => {
  del(['build/*']).then(() => {
    return copy('src/assets', 'build/public')
      .then(copy.bind(null, 'src/server.js', 'build/server.js'))
      .then(() => {
        const bundler = webpack(config);

        const bundle = (err, stats) => {
          if (err) console.log('error occured');
          console.log(stats.toString(config.stats));
        };
        bundler.run(bundle);
      });

  }, (err) => { console.log('error during delete', err); });
});
