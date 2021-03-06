/*
 * @Author:
 * @Date: 2019-12-11 09:53:41
 * @LastEditors  : VSCode
 * @LastEditTime : 2019-12-24 15:02:33
 * @Description: 打包环境启动脚本
 */

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('../config/webpack.prod.config');
const utils = require('./utils');
<% if(useDll) { %>
const createDllPromise = require('./dll');
<% } %>


const startBuild = (<% if(useDll) { %>dllList<% } %>) => {
	const spinner = ora('building for production...\n');
	spinner.start();

	rm(path.join(config.default.assetsRoot), err => {
		if (err) throw err;
		<% if(useDll) { %>
		// 添加dll插件
		if (dllList && dllList.length) utils.createDllPlugins(webpackConfig, dllList);
		<% } %>
		webpack(webpackConfig, (err, stats) => {
			spinner.stop();
			if (err) throw err;
			process.stdout.write(stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n');

			if (stats.hasErrors()) {
				console.log(chalk.red('  Build failed with errors.\n'));
				process.exit(1);
			}

			console.log(chalk.cyan('  Build complete.\n'));
		});
	});
};
<% if(useDll) { %>
createDllPromise().then(function({ dllList }) {
	startBuild(dllList);
});
<% } else { %>
startBuild();
<% } %>

