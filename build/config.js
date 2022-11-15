var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`web-vue2-front-end-lib/packages/${key}`] = `web-vue2-front-end-lib/lib/${key}`;
});

externals['web-vue2-front-end-lib/src/locale'] = 'web-vue2-front-end-lib/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`web-vue2-front-end-lib/src/utils/${file}`] = `web-vue2-front-end-lib/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`web-vue2-front-end-lib/src/mixins/${file}`] = `web-vue2-front-end-lib/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`web-vue2-front-end-lib/src/transitions/${file}`] = `web-vue2-front-end-lib/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'web-vue2-front-end-lib': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
