require('babel-register')({
  presets: [ 'es2015', 'stage-0' ],
  sourceMaps: process.env.DEV
});
require('./bot');
