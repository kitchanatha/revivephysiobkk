'use strict';
const fs = require('fs');
const upath = require('upath');
const pug = require('pug');
const sh = require('shelljs');
const prettier = require('prettier');

/**
 * Render a pug page. Single-page, single-language site — no lang/route
 * switching needed (see revivepilatesbkk's render-pug.js for that pattern
 * if this site ever grows into one).
 *
 * @param {string} filePath - source .pug file, e.g. src/pug/index.pug
 * @param {object} [options]
 * @param {string} [options.destPath] - explicit dist output path. Defaults to the
 *   src/pug -> dist mapping (e.g. src/pug/index.pug -> dist/index.html).
 */
module.exports = function renderPug(filePath, options = {}) {
    const destPath = options.destPath || filePath.replace(/src\/pug\//, 'dist/').replace(/\.pug$/, '.html');
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);

    const data = JSON.parse(fs.readFileSync(upath.join(srcPath, 'data/site.json')));

    const pugData = Object.assign({
        doctype: 'html',
        filename: filePath,
        basedir: srcPath
    }, data);

    const html = pug.renderFile(filePath, pugData);

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    fs.writeFileSync(destPath, prettified);
};
