/*
 * @Author: daipeng
 * @Date: 2019-12-27 10:23:52
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-27 10:39:57
 * @Description: babel
 */
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

const resolve = dir => path.resolve(__dirname, '../', dir);

const COPY_DIR_LIST = ['template', 'ui'];
const BABEL_TRANSFORM_LIST = ['bin', 'lib', 'utils'];

const buildFn = () => {
	fs.removeSync(resolve('dist'));
	COPY_DIR_LIST.forEach(dir => fs.copySync(resolve(`src/${dir}`), resolve(`dist/${dir}`)));
	BABEL_TRANSFORM_LIST.forEach(dir => execa('babel', [resolve(`src/${dir}`), '-d', resolve(`dist/${dir}`), '--copy-files']));
};

buildFn();
