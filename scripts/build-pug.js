'use strict';
const upath = require('upath');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const indexPug = upath.join(srcPath, 'pug/index.pug');

renderPug(indexPug, { destPath: 'dist/index.html' });
